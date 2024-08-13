// src/controllers/video.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'fastify-multer';
import { extname } from 'path';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './uploads/videos',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}${extname(file.originalname)}`;
          callback(null, filename); // Correctly using the callback
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.startsWith('video/')) {
          return callback(
            new Error('Invalid file type. Only video files are allowed.'),
          );
        }
        callback(null, true); // Correctly using the callback
      },
    }),
  )
  async upload(
    @Body() createVideoDto: CreateVideoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.videoService.uploadVideo(createVideoDto, file.filename);
  }

  @Get()
  async findAll() {
    return this.videoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.videoService.findOne(id);
  }
}
