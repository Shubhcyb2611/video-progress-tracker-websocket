import { Injectable } from '@nestjs/common';
import { VideoGateway } from 'src/gateway/video.gateway';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VideoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly videoGateway: VideoGateway,
  ) {}

  async uploadVideo(createVideoData, filename: string, userId) {
    return this.prisma.video.create({
      data: {
        ...createVideoData,
        title: 'video',
        url: `/uploads/videos/${filename}`,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.video.findMany();
  }

  async findOne(id: number) {
    return this.prisma.video.findUnique({
      where: { id },
    });
  }

  //user progress
  async updateProgress(userId: number, videoId: number, progress: number) {
    await this.prisma.userProgress.upsert({
      where: { AND: [{ userId: userId }, { videoId: videoId }] },
      update: {},
      create: {},
    });
  }
}
