const s3handler = require("./connection");
const { Upload } = require("@aws-sdk/lib-storage");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

const uploadFile = async (path, buffer, enconding, type) => {
    const params = {
        Bucket: process.env.STORAGE_NAME,
        Key: path,
        Body: buffer,
        ContentEnconding: enconding,
        ContentType: `image/${type}`,
    };

    const upload = new Upload({
        client: s3handler,
        params,
    });

    upload.on("Progresso", () => {});

    const data = await upload.done();

    return data;
};

const deleteFile = async (path) => {
    const params = {
        Bucket: process.env.STORAGE_NAME,
        Key: path,
    };

    const command = new DeleteObjectCommand(params);

    await s3handler.send(command);
};

module.exports = {
    uploadFile,
    deleteFile,
};
