import aws, { S3 } from 'aws-sdk';
import path from 'path';
import { readFile, unlink } from 'fs/promises';


export class S3Storage {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: 'sa-east-1'
        })

    }

    async saveFile(filename: string, contentType: string): Promise<string> {
        const originalPath = path.resolve(__dirname, '..', 'tmp', 'uploads', filename)

        const fileContent = await readFile(originalPath)
        const bucketName = process.env.AWS_BUCKET_NAME || ''
        // enviar para o bucket
        this.client.putObject({
            Bucket: bucketName,
            Key: filename,
            ACL: 'public-read',
            Body: fileContent,
            ContentType: contentType
        }).promise()

        const urlFileS3 = `https://${bucketName}.s3.sa-east-1.amazonaws.com/${filename}`

        // remover arquivo da pasta tmps
        await unlink(originalPath)

        return urlFileS3
    }

    async deleteFile(filename: string): Promise<void> {
        const bucketName = process.env.AWS_BUCKET_NAME || ''
        this.client.deleteObject({
            Bucket: bucketName,
            Key: filename
        }).promise()
    }

}