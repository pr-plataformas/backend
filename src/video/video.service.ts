import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { VideoStorageService } from './video-storage.service';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    private readonly videoStorageService: VideoStorageService,
  ) {}

  async upload(
    file: Express.Multer.File,
    createVideoDto: CreateVideoDto,
  ): Promise<Video> {
    const fileKey = `videos/${uuid()}-${file.originalname}`;
    let fileUrl: string;
    const startTime = Date.now();

    if (file.size > 5 * 1024 * 1024) {
      fileUrl = await this.videoStorageService.uploadLargeFile(fileKey, file);
    } else {
      fileUrl = await this.videoStorageService.uploadFile(fileKey, file);
    }

    const uploadTime = (Date.now() - startTime) / 1000;

    const video = this.videoRepository.create({
      ...createVideoDto,
      fileKey,
      fileUrl,
      contentType: file.mimetype,
      fileSize: file.size,
      uploadDuration: Math.floor(uploadTime),
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
    const buffer = await this.videoStorageService.getFile(video.fileKey);
    return {
      buffer,
      contentType: video.contentType,
    };
  }

  async findAll() {
    try {
      const videos = await this.videoRepository.find();
      if (videos.length === 0) {
        throw new NotFoundException('No videos found');
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Error retrieving videos from the database',
      );
    }
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
    await this.videoStorageService.deleteFile(video.fileKey);
    return this.videoRepository.softDelete(id);
  }
}
