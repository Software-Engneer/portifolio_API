# Cloudinary Setup (Optional)

For better image performance and permanent storage, you can set up Cloudinary.

## Current Setup
Currently, images are stored as base64 in the database, which works but can be slow for large images.

## Cloudinary Setup (Recommended)

1. **Sign up for Cloudinary** (free tier available):
   - Go to https://cloudinary.com/
   - Create a free account

2. **Get your credentials**:
   - Cloud Name
   - API Key
   - API Secret

3. **Add environment variables** to your Render service:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Redeploy your backend**

## Benefits of Cloudinary
- ✅ Images never disappear
- ✅ Automatic optimization
- ✅ CDN delivery (faster loading)
- ✅ Multiple formats and sizes
- ✅ Better performance

## Current Base64 Storage
- ✅ Images stored in database (never lost)
- ✅ Works without external services
- ✅ Simple setup
- ❌ Slower loading for large images
- ❌ Larger database size

## Migration
If you want to migrate from base64 to Cloudinary later:
1. Set up Cloudinary
2. Add environment variables
3. Redeploy backend
4. New uploads will use Cloudinary
5. Old base64 images will still work 