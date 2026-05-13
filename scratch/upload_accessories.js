const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dyxjxhie1',
  api_key: '282357371216273',
  api_secret: '41S-xte1JKhsHwOWGrMg1YsyiRM'
});

const imagePath = 'C:\\Users\\saifa\\.gemini\\antigravity\\brain\\d22f47f3-26d7-4bd4-8204-b90bd993b3a4\\baby_accessories_curated_1778656998548.png';

cloudinary.uploader.upload(imagePath, {
  folder: 'zuzuminis',
  public_id: 'baby_accessories_curated'
}).then(result => {
  console.log('UPLOAD_SUCCESS:' + result.secure_url);
}).catch(error => {
  console.error('UPLOAD_ERROR:' + error.message);
});
