import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
if (typeof process.env.CLOUDINARY_URL === 'string') {
  cloudinary.config({
    cloud_url: process.env.CLOUDINARY_URL,
  });
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export interface UploadResult {
  url: string;
  publicId: string;
  resourceType: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
}

export interface UploadOptions {
  folder?: string;
  resourceType?: 'image' | 'video' | 'auto' | 'raw';
}

/**
 * Upload a file to Cloudinary from a buffer or base64 string
 */
export async function uploadFile(
  file: Buffer | string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const { folder = 'film-decks', resourceType = 'auto' } = options;

  // Convert Buffer to base64 data URI if needed
  let fileData: string;
  if (Buffer.isBuffer(file)) {
    fileData = `data:image/jpeg;base64,${file.toString('base64')}`;
  } else {
    fileData = file;
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileData,
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve({
          url: result?.secure_url || '',
          publicId: result?.public_id || '',
          resourceType: result?.resource_type || '',
          format: result?.format,
          width: result?.width,
          height: result?.height,
          bytes: result?.bytes,
        });
      }
    );
  });
}

/**
 * Upload a base64 encoded file (useful for client-side uploads)
 */
export async function uploadBase64(
  base64: string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  // Remove data URL prefix if present
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  return uploadFile(buffer, options);
}

/**
 * Delete a file from Cloudinary
 */
export async function deleteFile(publicId: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve((result?.result || 'unknown') === 'ok');
    });
  });
}

/**
 * Get a transformed image URL
 */
export function getTransformedUrl(
  publicId: string,
  transformations: Record<string, any> = {}
): string {
  return cloudinary.url(publicId, {
    secure: true,
    transformation: transformations,
  });
}

export { cloudinary };
