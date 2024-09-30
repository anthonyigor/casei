import { S3Storage } from "../../utils/S3Storage";

export class DeleteFileFromS3 {
    async execute(filename: string): Promise<void> {
        const s3 = new S3Storage()
        s3.deleteFile(filename)
    }
}