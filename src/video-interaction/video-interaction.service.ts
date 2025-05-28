import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoInteraction } from './entities/video-interaction.entity';
import { CreateVideoInteractionDto } from './dto/create-video-interaction.dto';
import { UpdateVideoInteractionDto } from './dto/update-video-interaction.dto';

@Injectable()
export class VideoInteractionService {
  constructor(
    @InjectRepository(VideoInteraction)
    private readonly interactionRepository: Repository<VideoInteraction>,
  ) {}

  create(createDto: CreateVideoInteractionDto) {
    try {
      const { userId, videoId, ...rest } = createDto;
      const interaction = this.interactionRepository.create({
        ...rest,
        user: { id: userId },
        video: { id: videoId },
      });
      return this.interactionRepository.save(interaction);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al crear la interacción de video',
      );
    }
  }

  findAll() {
    try {
      return this.interactionRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al listar interacciones de video',
      );
    }
  }

  findOne(id: string) {
    try {
      const interaction = this.interactionRepository.findOne({ where: { id } });
      if (!interaction)
        throw new NotFoundException('Interacción no encontrada');
      return interaction;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al buscar la interacción de video',
      );
    }
  }

  update(id: string, updateDto: UpdateVideoInteractionDto) {
    try {
      return this.interactionRepository.update(id, updateDto);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al actualizar la interacción de video',
      );
    }
  }

  remove(id: string) {
    try {
      return this.interactionRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al eliminar la interacción de video',
      );
    }
  }
}
