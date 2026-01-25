'use client';

import { useState, useCallback } from 'react';
import { Upload, X, FileImage, FileText, Loader2 } from 'lucide-react';

export interface UploadedFile {
  url: string;
  publicId: string;
  name: string;
  size: number;
  type: string;
}

interface FileUploadProps {
  onUploadComplete?: (file: UploadedFile) => void;
  onUploadError?: (error: string) => void;
  accept?: string;
  maxSize?: number; // in bytes
  folder?: string;
  disabled?: boolean;
  className?: string;
}

export function FileUpload({
  onUploadComplete,
  onUploadError,
  accept = 'image/*,application/pdf,.pdf',
  maxSize = 10 * 1024 * 1024, // 10MB default
  folder = 'film-decks',
  disabled = false,
  className = '',
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFile = useCallback(async (file: File): Promise<UploadedFile | null> => {
    // Validate file size
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / 1024 / 1024).toFixed(1);
      onUploadError?.(`File too large. Maximum size is ${maxSizeMB}MB`);
      return null;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress (Cloudinary doesn't provide progress in basic upload)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      formData.append('resourceType', 'auto');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const result = await response.json();

      if (result.success) {
        setUploadProgress(100);
        const uploadedFile: UploadedFile = {
          url: result.data.url,
          publicId: result.data.publicId,
          name: file.name,
          size: file.size,
          type: file.type,
        };
        onUploadComplete?.(uploadedFile);
        return uploadedFile;
      }

      throw new Error('Upload failed');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to upload file';
      onUploadError?.(message);
      return null;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [maxSize, folder, onUploadComplete, onUploadError]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  }, [disabled, uploadFile]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  }, [disabled, uploadFile]);

  const getFileIcon = () => {
    return accept.includes('pdf') ? FileText : FileImage;
  };

  const FileIcon = getFileIcon();

  return (
    <div className={className}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all
          ${isDragging ? 'border-accent-indigo bg-accent-indigo/5' : 'border-charcoal/20 hover:border-charcoal/40'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${isUploading ? 'pointer-events-none' : ''}
        `}
      >
        <input
          type="file"
          id="file-upload"
          accept={accept}
          onChange={handleFileSelect}
          disabled={disabled || isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />

        {isUploading ? (
          <div className="space-y-4">
            <Loader2 className="w-12 h-12 mx-auto text-accent-indigo animate-spin" />
            <div>
              <p className="text-sm font-medium text-charcoal">Uploading...</p>
              <div className="mt-2 h-2 bg-charcoal/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-indigo transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-charcoal/50">{uploadProgress}%</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-accent-indigo/10 rounded-full flex items-center justify-center">
              <FileIcon className="w-8 h-8 text-accent-indigo" />
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal">
                {accept.includes('pdf') ? 'Upload your pitch deck' : 'Upload a file'}
              </p>
              <p className="text-sm text-charcoal/60 mt-1">
                Drag and drop, or click to browse
              </p>
              <p className="text-xs text-charcoal/40 mt-2">
                Max size: {(maxSize / 1024 / 1024).toFixed(1)}MB
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface UploadedFileDisplayProps {
  file: UploadedFile;
  onRemove?: () => void;
  className?: string;
}

export function UploadedFileDisplay({ file, onRemove, className = '' }: UploadedFileDisplayProps) {
  const isImage = file.type.startsWith('image/');
  const isPdf = file.type === 'application/pdf' || file.url.endsWith('.pdf');

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <div className={`flex items-center gap-4 p-4 bg-white rounded-lg border border-charcoal/10 ${className}`}>
      <div className="w-12 h-12 bg-charcoal/5 rounded-lg flex items-center justify-center flex-shrink-0">
        {isImage ? (
          <img src={file.url} alt={file.name} className="w-full h-full object-cover rounded-lg" />
        ) : isPdf ? (
          <FileText className="w-6 h-6 text-accent-indigo" />
        ) : (
          <FileImage className="w-6 h-6 text-accent-indigo" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-charcoal truncate">{file.name}</p>
        <p className="text-xs text-charcoal/50">{formatSize(file.size)}</p>
      </div>

      {onRemove && (
        <button
          onClick={onRemove}
          className="p-2 text-charcoal/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Remove file"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
