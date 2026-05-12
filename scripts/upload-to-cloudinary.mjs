import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const assetsDir = path.join(process.cwd(), 'public', 'assets', 'products');
const resultsFile = path.join(process.cwd(), 'scripts', 'cloudinary-map.json');

async function uploadImages() {
  const files = fs.readdirSync(assetsDir);
  const mapping = {};

  console.log(`Found ${files.length} images to upload...`);

  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png|webp|gif)$/i)) continue;

    const filePath = path.join(assetsDir, file);
    
    try {
      console.log(`Uploading ${file}...`);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'zuzuminis/products',
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });
      
      mapping[file] = result.secure_url;
      console.log(`✓ Uploaded ${file} -> ${result.secure_url}`);
    } catch (error) {
      console.error(`✗ Failed to upload ${file}:`, error.message);
    }
  }

  fs.mkdirSync(path.dirname(resultsFile), { recursive: true });
  fs.writeFileSync(resultsFile, JSON.stringify(mapping, null, 2));
  console.log(`\nSuccess! Cloudinary mapping saved to ${resultsFile}`);
}

uploadImages();
