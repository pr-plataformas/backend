import {
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  UploadPartCommand,
} from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'src/config/config';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.aws.region,
      credentials: {
        accessKeyId: this.configService.aws.accessKeyId,
        secretAccessKey: this.configService.aws.secretAccessKey,
      },
    });
    this.bucketName = this.configService.aws.s3.bucketName;
  }

  // Método para subir archivos pequeños (< 5MB)
  async uploadFile(
    key: string,
    file: Buffer,
    contentType: string,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file,
      ContentType: contentType,
    });

    await this.s3Client.send(command);
    return this.getFileUrl(key);
  }

  // Método para subir archivos grandes usando multipart upload
  async uploadLargeFile(
    key: string,
    file: Buffer,
    contentType: string,
    chunkSize = 5 * 1024 * 1024, // 5MB por defecto
  ): Promise<string> {
    try {
      // Iniciar multipart upload
      const createCommand = new CreateMultipartUploadCommand({
        Bucket: this.bucketName,
        Key: key,
        ContentType: contentType,
      });

      const { UploadId } = await this.s3Client.send(createCommand);

      if (!UploadId) {
        throw new Error('Failed to create multipart upload');
      }

      // Dividir el archivo en partes
      const partCount = Math.ceil(file.length / chunkSize);
      const parts = [];

      for (let i = 0; i < partCount; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, file.length);
        const partBuffer = file.slice(start, end);

        const uploadPartCommand = new UploadPartCommand({
          Bucket: this.bucketName,
          Key: key,
          UploadId,
          Body: partBuffer,
          PartNumber: i + 1,
        });

        const { ETag } = await this.s3Client.send(uploadPartCommand);
        parts.push({ ETag, PartNumber: i + 1 });
      }

      // Completar multipart upload
      const completeCommand = new CompleteMultipartUploadCommand({
        Bucket: this.bucketName,
        Key: key,
        UploadId,
        MultipartUpload: { Parts: parts },
      });

      await this.s3Client.send(completeCommand);
      return this.getFileUrl(key);
    } catch (error) {
      console.error('Error in multipart upload:', error);
      throw error;
    }
  }

  async getFile(key: string): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const response = await this.s3Client.send(command);

    if (!response.Body) {
      throw new Error('S3 response body is empty');
    }

    // En AWS SDK v3, usa transformToByteArray()
    return Buffer.from(await response.Body.transformToByteArray());
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    await this.s3Client.send(command);
  }

  getFileUrl(key: string): string {
    return `https://${this.bucketName}.s3.${this.configService.aws.region}.amazonaws.com/${key}`;
  }

  // Método para generar URL firmada con tiempo de expiración
  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner');
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn });
  }
}
