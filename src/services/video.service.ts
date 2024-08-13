import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VideoSerice {
  constructor(private readonly prisma: PrismaService) {}

  async uploadVideo(createVideoData, filename: string) {
    return this.prisma.video.create({
      data: {
        ...createVideoData,
        url: `/uploads/videos/${filename}`,
      },
    });
  }

  async findAll(id: number) {
    return this.prisma.video.findMany();
  }

  async findOne(id: number) {
    return this.prisma.video.findUnique({
      where: { id },
    });
  }
}
