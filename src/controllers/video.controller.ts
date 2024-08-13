// src/controllers/video.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/fastify-multer.config';
import { VideoSerice } from 'src/services/video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoSerice) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async upload(
    @Body() createVideoDto,
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
