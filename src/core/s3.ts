import s3, { PutObjectRequest } from 'aws-sdk/clients/s3';

if(!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set');
}


const s3Client = new s3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const BUCKET = process.env.BUCKET;

if(!BUCKET) {
    throw new Error('BUCKET is not defined');
}


// Upload file to S3
export const uploadFile = async (file: Express.Multer.File, fileName: string) => {
    const params: PutObjectRequest = {
        Bucket: BUCKET,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
    };

    await s3Client.upload(params).promise();
    return `https://${BUCKET}.s3.amazonaws.com/${fileName}`;


}

// Delete file from S3
export const deleteFile = (fileName: string) => {
    return s3Client.deleteObject({
        Bucket: BUCKET,
        Key: fileName
    }).promise();
}

// Get file from S3
export const getFile = async (fileName: string) => {
    const x = await s3Client.getObject({
        Bucket: BUCKET,
        Key: fileName
    }).promise();
}