"""
File Upload Handler

Handles secure file uploads for scripts, treatments, pitch decks, etc.
Supports local storage and S3.
"""

import os
import uuid
import aiofiles
from pathlib import Path
from typing import Optional
from dataclasses import dataclass

import magic
import boto3
from botocore.exceptions import ClientError
from fastapi import UploadFile, HTTPException

from app.core.config import settings


@dataclass
class UploadResult:
    """Result of a file upload operation."""
    success: bool
    stored_filename: str
    file_path: str
    file_size_bytes: int
    mime_type: str
    error: Optional[str] = None


class FileHandler:
    """
    Handles file uploads with validation and storage.
    """

    def __init__(self):
        self.storage_type = settings.STORAGE_TYPE
        self.upload_dir = Path(settings.UPLOAD_DIR)
        self.max_size_bytes = settings.MAX_FILE_SIZE_MB * 1024 * 1024
        self.allowed_types = settings.ALLOWED_FILE_TYPES

        # Ensure upload directory exists for local storage
        if self.storage_type == "local":
            self.upload_dir.mkdir(parents=True, exist_ok=True)

        # Initialize S3 client if needed
        if self.storage_type == "s3":
            self.s3_client = boto3.client(
                "s3",
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                region_name=settings.AWS_REGION,
            )
            self.s3_bucket = settings.S3_BUCKET

    async def upload_file(
        self,
        file: UploadFile,
        lead_id: int,
        submission_type: str
    ) -> UploadResult:
        """
        Upload a file with validation.

        Args:
            file: The uploaded file
            lead_id: ID of the lead submitting
            submission_type: Type of submission (script, treatment, pitch_deck)

        Returns:
            UploadResult with file details
        """
        try:
            # Read file content
            content = await file.read()
            file_size = len(content)

            # Validate file size
            if file_size > self.max_size_bytes:
                raise HTTPException(
                    status_code=400,
                    detail=f"File too large. Maximum size is {settings.MAX_FILE_SIZE_MB}MB"
                )

            # Validate file type using magic bytes
            mime_type = magic.from_buffer(content, mime=True)
            if mime_type not in self.allowed_types:
                raise HTTPException(
                    status_code=400,
                    detail=f"File type '{mime_type}' not allowed. Allowed types: PDF, PPTX, PPT, DOC, DOCX, TXT"
                )

            # Generate unique filename
            file_ext = Path(file.filename).suffix if file.filename else ""
            stored_filename = f"{lead_id}_{submission_type}_{uuid.uuid4().hex}{file_ext}"

            # Upload based on storage type
            if self.storage_type == "s3":
                file_path = await self._upload_to_s3(stored_filename, content, mime_type)
            else:
                file_path = await self._upload_to_local(stored_filename, content)

            return UploadResult(
                success=True,
                stored_filename=stored_filename,
                file_path=file_path,
                file_size_bytes=file_size,
                mime_type=mime_type
            )

        except HTTPException:
            raise
        except Exception as e:
            return UploadResult(
                success=False,
                stored_filename="",
                file_path="",
                file_size_bytes=0,
                mime_type="",
                error=str(e)
            )
        finally:
            # Reset file position for potential re-reads
            await file.seek(0)

    async def _upload_to_local(self, filename: str, content: bytes) -> str:
        """Upload file to local filesystem."""
        file_path = self.upload_dir / filename
        async with aiofiles.open(file_path, "wb") as f:
            await f.write(content)
        return str(file_path)

    async def _upload_to_s3(self, filename: str, content: bytes, mime_type: str) -> str:
        """Upload file to S3."""
        try:
            self.s3_client.put_object(
                Bucket=self.s3_bucket,
                Key=filename,
                Body=content,
                ContentType=mime_type
            )
            return f"s3://{self.s3_bucket}/{filename}"
        except ClientError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to upload to S3: {str(e)}"
            )

    async def get_file(self, file_path: str) -> Optional[bytes]:
        """
        Retrieve a file's content.

        Args:
            file_path: Path to the file (local or S3)

        Returns:
            File content as bytes, or None if not found
        """
        try:
            if file_path.startswith("s3://"):
                # Parse S3 path
                parts = file_path.replace("s3://", "").split("/", 1)
                bucket = parts[0]
                key = parts[1]
                response = self.s3_client.get_object(Bucket=bucket, Key=key)
                return response["Body"].read()
            else:
                async with aiofiles.open(file_path, "rb") as f:
                    return await f.read()
        except Exception:
            return None

    async def delete_file(self, file_path: str) -> bool:
        """
        Delete a file.

        Args:
            file_path: Path to the file (local or S3)

        Returns:
            True if deleted successfully
        """
        try:
            if file_path.startswith("s3://"):
                parts = file_path.replace("s3://", "").split("/", 1)
                bucket = parts[0]
                key = parts[1]
                self.s3_client.delete_object(Bucket=bucket, Key=key)
            else:
                os.remove(file_path)
            return True
        except Exception:
            return False


# Singleton instance
file_handler = FileHandler()
