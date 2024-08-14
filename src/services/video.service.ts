import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VideoService {
  constructor(private readonly prisma: PrismaService) {}

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
}
