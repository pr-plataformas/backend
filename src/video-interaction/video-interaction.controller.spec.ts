import { Test, TestingModule } from '@nestjs/testing';
import { VideoInteractionController } from './video-interaction.controller';
import { VideoInteractionService } from './video-interaction.service';

describe('VideoInteractionController', () => {
  let controller: VideoInteractionController;
  let service: any;

  const mockInteraction = { id: '1', type: 'LIKE' };

  beforeEach(async () => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoInteractionController],
      providers: [{ provide: VideoInteractionService, useValue: service }],
    }).compile();

    controller = module.get<VideoInteractionController>(
      VideoInteractionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create interaction', async () => {
    service.create.mockResolvedValue(mockInteraction);
    const result = await controller.create({ type: 'LIKE' });
    expect(result.data).toEqual(mockInteraction);
    expect(result.status).toBe(201);
  });

  it('should return all interactions', async () => {
    service.findAll.mockResolvedValue([mockInteraction]);
    const result = await controller.findAll();
    expect(result.data).toEqual([mockInteraction]);
    expect(result.status).toBe(200);
  });

  it('should return one interaction', async () => {
    service.findOne.mockResolvedValue(mockInteraction);
    const result = await controller.findOne('1');
    expect(result.data).toEqual(mockInteraction);
    expect(result.status).toBe(200);
  });

  it('should update interaction', async () => {
    service.update.mockResolvedValue(mockInteraction);
    const result = await controller.update('1', { type: 'DISLIKE' });
    expect(result.data).toEqual(mockInteraction);
    expect(result.status).toBe(200);
  });

  it('should remove interaction', async () => {
    service.remove.mockResolvedValue(undefined);
    const result = await controller.remove('1');
    expect(result.status).toBe(200);
  });
});
