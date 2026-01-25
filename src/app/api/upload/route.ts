import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/cloudinary';

export const runtime = 'nodejs';
export const maxDuration = 30; // 30 seconds for file uploads

/**
 * POST /api/upload
 * Upload a file to Cloudinary
 *
 * Body:
 * - file: Base64 string or form data with file
 * - folder: Optional folder name (default: 'film-decks')
 * - resourceType: 'image' | 'video' | 'auto' | 'raw' (default: 'auto')
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as string | File;
    const folder = (formData.get('folder') as string) || 'film-decks';
    const resourceType = (formData.get('resourceType') as any) || 'auto';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    let uploadData: Buffer | string;

    // Handle both File objects and base64 strings
    if (typeof file === 'string') {
      uploadData = file;
    } else {
      const arrayBuffer = await file.arrayBuffer();
      uploadData = Buffer.from(arrayBuffer);
    }

    const result = await uploadFile(uploadData, {
      folder,
      resourceType,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload file',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/upload
 * Delete a file from Cloudinary
 *
 * Body:
 * - publicId: The public ID of the file to delete
 */
export async function DELETE(request: NextRequest) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: 'No public ID provided' },
        { status: 400 }
      );
    }

    const { deleteFile } = await import('@/lib/cloudinary');
    const result = await deleteFile(publicId);

    return NextResponse.json({
      success: result,
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete file',
      },
      { status: 500 }
    );
  }
}
