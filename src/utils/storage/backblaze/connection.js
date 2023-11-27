const { S3Client } = require("@aws-sdk/client-s3");

const s3handler = new S3Client({
  endpoint: process.env.ENDPOINT_S3,
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY,
  },
});

module.exports = s3handler;
