import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoComment } from './entities/video-comment.entity';
import { CreateVideoCommentDto } from './dto/create-video-comment.dto';
import { UpdateVideoCommentDto } from './dto/update-video-comment.dto';

@Injectable()
export class VideoCommentService {
  constructor(
    @InjectRepository(VideoComment)
    private readonly commentRepository: Repository<VideoComment>,
  ) {}

  create(dto: CreateVideoCommentDto) {
    const comment = this.commentRepository.create(dto);
    return this.commentRepository.save(comment);
  }

  findAll() {
    return this.commentRepository.find();
  }

  findOne(id: string) {
    return this.commentRepository.findOne({ where: { id } });
  }

  update(id: string, dto: UpdateVideoCommentDto) {
    return this.commentRepository.update(id, dto);
  }

  remove(id: string) {
    return this.commentRepository.delete(id);
  }
}
