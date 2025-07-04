import multer from 'multer';
import sharp from 'sharp';

// Configure multer storage
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

// Configure multer upload
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Process uploaded image and store as base64
export const processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    // Process image with sharp
    const processedBuffer = await sharp(req.file.buffer)
      .resize(1200, 1200, { // Max dimensions
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 80 }) // Convert to WebP format
      .toBuffer();

    // Store as base64 - this prevents images from disappearing
    const base64Image = `data:image/webp;base64,${processedBuffer.toString('base64')}`;
    req.processedImage = base64Image;

    next();
  } catch (error) {
    console.error('Image upload error:', error);
    next(error);
  }
};

// Error handling middleware for upload errors
export const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        message: 'File size should not exceed 5MB'
      });
    }
    return res.status(400).json({
      error: 'Upload error',
      message: error.message
    });
  }
  next(error);
};

export { upload }; 