import { Storage } from '@google-cloud/storage';

export const getStorageConfig = () => {
  return new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });
};
