import { Test, TestingModule } from '@nestjs/testing';
import { VideoBookmarkController } from './video-bookmark.controller';
import { VideoBookmarkService } from './video-bookmark.service';

describe('VideoBookmarkController', () => {
  let controller: VideoBookmarkController;
  let service: any;

  const mockBookmark = { id: '1', note: 'Test' };

  beforeEach(async () => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoBookmarkController],
      providers: [{ provide: VideoBookmarkService, useValue: service }],
    }).compile();

    controller = module.get<VideoBookmarkController>(VideoBookmarkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create bookmark', async () => {
    service.create.mockResolvedValue(mockBookmark);
    const result = await controller.create({ note: 'Test' });
    expect(result).toEqual(mockBookmark);
  });

  it('should return all bookmarks', async () => {
    service.findAll.mockResolvedValue([mockBookmark]);
    const result = await controller.findAll();
    expect(result).toEqual([mockBookmark]);
  });

  it('should return one bookmark', async () => {
    service.findOne.mockResolvedValue(mockBookmark);
    const result = await controller.findOne('1');
    expect(result).toEqual(mockBookmark);
  });

  it('should update bookmark', async () => {
    service.update.mockResolvedValue(mockBookmark);
    const result = await controller.update('1', { note: 'Updated' });
    expect(result).toEqual(mockBookmark);
  });

  it('should remove bookmark', async () => {
    service.remove.mockResolvedValue(undefined);
    const result = await controller.remove('1');
    expect(result).toBeUndefined();
  });
});
