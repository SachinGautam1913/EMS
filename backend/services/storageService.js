// Storage service for file uploads
// Currently uses local storage, but can be extended to use S3, Cloudinary, etc.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Local storage implementation
export const uploadFile = async (file, folder = 'documents') => {
  try {
    const uploadDir = path.join(__dirname, '../uploads', folder);
    
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `${Date.now()}-${file.originalname}`;
    const filepath = path.join(uploadDir, filename);

    // Move file to upload directory
    fs.renameSync(file.path, filepath);

    return {
      success: true,
      url: `/uploads/${folder}/${filename}`,
      filename
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const deleteFile = async (fileUrl) => {
  try {
    const filepath = path.join(__dirname, '../', fileUrl);
    
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      return { success: true };
    }
    
    return { success: false, error: 'File not found' };
  } catch (error) {
    console.error('Error deleting file:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// AWS S3 implementation (commented - uncomment and configure for production)
/*
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export const uploadFile = async (file, folder = 'documents') => {
  try {
    const filename = `${Date.now()}-${file.originalname}`;
    const key = `${folder}/${filename}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: fs.createReadStream(file.path),
      ContentType: file.mimetype,
      ACL: 'public-read'
    };

    const result = await s3.upload(params).promise();

    return {
      success: true,
      url: result.Location,
      filename: key
    };
  } catch (error) {
    console.error('Error uploading to S3:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const deleteFile = async (fileUrl) => {
  try {
    const key = fileUrl.split('.com/')[1]; // Extract key from URL
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key
    };

    await s3.deleteObject(params).promise();
    return { success: true };
  } catch (error) {
    console.error('Error deleting from S3:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
*/

// Cloudinary implementation (commented - uncomment and configure for production)
/*
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadFile = async (file, folder = 'documents') => {
  try {
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: `prismhr/${folder}`,
      resource_type: 'auto'
    });

    return {
      success: true,
      url: result.secure_url,
      filename: result.public_id
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const deleteFile = async (fileUrl) => {
  try {
    const publicId = fileUrl.split('/').slice(-2).join('/').split('.')[0];
    await cloudinary.v2.uploader.destroy(publicId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
*/

