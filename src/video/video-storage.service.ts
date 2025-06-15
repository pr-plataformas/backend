import { Injectable } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class VideoStorageService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadFile(
    fileKey: string,
    file: Express.Multer.File,
  ): Promise<string> {
    return this.s3Service.uploadFile(fileKey, file.buffer, file.mimetype);
  }

  async uploadLargeFile(
    fileKey: string,
    file: Express.Multer.File,
  ): Promise<string> {
    return this.s3Service.uploadLargeFile(fileKey, file.buffer, file.mimetype);
  }

  async getFile(fileKey: string): Promise<Buffer> {
    return this.s3Service.getFile(fileKey);
  }

  async deleteFile(fileKey: string): Promise<void> {
    return this.s3Service.deleteFile(fileKey);
  }
}
