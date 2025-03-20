import { S3Storage } from "../../utils/S3Storage";

export class UploadFileToS3 {
    async execute(filename: string, contentType: string): Promise<string> {
        const s3 = new S3Storage()
        const fileUrl = await s3.saveFile(filename, contentType)
        return fileUrl
    }
}