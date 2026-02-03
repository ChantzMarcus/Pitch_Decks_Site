// Upload script for Star Quest Odyssey PDF
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary from environment
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

const PDF_PATH = path.join(__dirname, '../STAR QUEST ODYSSEY PITCH DECK V2-2.pdf');

async function uploadPDF() {
  try {
    console.log('Uploading STAR QUEST ODYSSEY PITCH DECK V2-2.pdf to Cloudinary...');

    const result = await cloudinary.uploader.upload(PDF_PATH, {
      folder: 'pitch-decks/pitch-decks/star-quest-odyssey',
      resource_type: 'raw',
      public_id: 'pitch-decks/pitch-decks/star-quest-odyssey/star-quest-odyssey-v2',
      use_filename: true,
    });

    console.log('✅ Upload successful!');
    console.log('URL:', result.secure_url);
    console.log('Public ID:', result.public_id);
    console.log('Resource Type:', result.resource_type);
    console.log('Size:', (result.bytes / 1024).toFixed(2), 'KB');

    return result;
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    throw error;
  }
}

// Run the upload
uploadPDF()
  .then(result => {
    console.log('\n✅ Star Quest Odyssey PDF uploaded successfully!');
    console.log('Add this URL to mock-decks.ts:');
    console.log(`  pdf_url: '${result.secure_url}',`);
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Failed to upload PDF:', error);
    process.exit(1);
  });
