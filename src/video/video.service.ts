import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/common/services/s3/s3.service';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    private readonly s3Service: S3Service,
  ) {}

  async upload(
    file: Express.Multer.File,
    createVideoDto: CreateVideoDto,
  ): Promise<Video> {
    const fileKey = `videos/${uuid()}-${file.originalname}`;
    let fileUrl: string;

    // Registrar el tiempo antes de comenzar la carga
    const startTime = Date.now();

    // Usar carga multiparte si es mayor a 5MB
    if (file.size > 5 * 1024 * 1024) {
      fileUrl = await this.s3Service.uploadLargeFile(
        fileKey,
        file.buffer,
        file.mimetype,
      );
    } else {
      fileUrl = await this.s3Service.uploadFile(
        fileKey,
        file.buffer,
        file.mimetype,
      );
    }

    // Calcular el tiempo que tomó la carga (en segundos)
    const uploadTime = (Date.now() - startTime) / 1000;

    const video = this.videoRepository.create({
      ...createVideoDto,
      fileKey,
      fileUrl,
      contentType: file.mimetype,
      fileSize: file.size,
      uploadDuration: Math.floor(uploadTime), // Guardar el tiempo de carga como entero
    });

    return this.videoRepository.save(video);
  }

  async getVideoStream(
    id: string,
  ): Promise<{ buffer: Buffer; contentType: string }> {
    const video = await this.videoRepository.findOne({ where: { id } });

    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }

    const buffer = await this.s3Service.getFile(video.fileKey);

    return {
      buffer,
      contentType: video.contentType,
    };
  }

  async findAll() {
    return this.videoRepository.find();
  }

  async findOne(id: string) {
    const video = await this.videoRepository.findOne({ where: { id } });
    if (!video) {
      throw new NotFoundException(`Video con ID "${id}" no encontrado`);
    }
    return video;
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    const video = await this.findOne(id);
    const updated = this.videoRepository.merge(video, updateVideoDto);
    return this.videoRepository.save(updated);
  }

  async remove(id: string) {
    const video = await this.findOne(id);

    // Eliminar archivo de S3
    await this.s3Service.deleteFile(video.fileKey);

    // Eliminar registro de la base de datos
    return this.videoRepository.softDelete(id);
  }
}
