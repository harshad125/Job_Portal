import enums from '../helper/enums.js';
import { upload } from '../middlewares/multer.middleware.js';

export const fileUploadCtrl = (type) =>
  type === enums.fileUploadType.single
    ? upload.single('profilePicture')
    : upload.fields([
        {
          name: 'profilePicture',
          maxCount: 1,
        },
      ]);
