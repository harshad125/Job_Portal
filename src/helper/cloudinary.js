import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, option) => {
  try {
    if (option == 'single') {
      console.log(localFilePath);
      if (!localFilePath) return null;
      //upload the file on cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: 'auto',
      });
      // file has been uploaded successfull
      //console.log("file is uploaded on cloudinary ", response.url);
      fs.unlinkSync(localFilePath);
      return response;
    } else {
      let response = [];
      if (localFilePath.length > 0) {
        for (let i = 0; i < localFilePath.length; i++) {
          const item = await cloudinary.uploader.upload(localFilePath[i], {
            resource_type: 'auto',
          });
          // file has been uploaded successfull
          //console.log("file is uploaded on cloudinary ", response.url);
          fs.unlinkSync(localFilePath[i]);
          response.push(item.url);
        }
      }
      return response;
    }
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteOnCloudinary = async (oldImageUrl) => {
  try {
    const publicId = oldImageUrl.split('/').pop().split('.')[0];
    console.log(oldImageUrl + ' ' + publicId);
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    return null;
  }
};

export { uploadOnCloudinary, deleteOnCloudinary };
