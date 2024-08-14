import { Controller, Post, Body, Get, Param, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify'; // Import FastifyRequest type
import { VideoService } from 'src/services/video.service';
import * as fs from 'fs'; // Import file system module
import * as path from 'path'; // Import path module

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('upload')
  async upload(
    @Body() createVideoDto,
    @Req() request: FastifyRequest, // Use FastifyRequest type
  ) {
    const data = await request.file(); // Get the uploaded file from request
    if (!data) {
      throw new Error('No file uploaded');
    }

    const file = data.file; // The file stream
    const filePath = path.join(__dirname, '../../', 'uploads', data.filename); // Define file path

    // Create a writable stream to save the file
    const writeStream = fs.createWriteStream(filePath);

    // Pipe the file stream to the writable stream
    file.pipe(writeStream);

    // Wait for the file to be fully written
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
    // Proceed to process the file and call your service
    return this.videoService.uploadVideo(createVideoDto, data.filename, 1);
  }

  @Get()
  async findAll() {
    return this.videoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.videoService.findOne(id);
  }

  //user progress
  @Post('progress')
  async upsertProgress(
    @Body() body: { userId: number; videoId: number; progress: number },
  ) {
    const { userId, videoId, progress } = body;
    return this.videoService.updateProgress(userId, videoId, progress);
  }

  @Get("progress/:userId/:videoId")
  async getProgress(@Param("userId") userId : number , @Param("videoId") videoId : number ){
    return this.videoService.getProgress(userId , videoId)
  }
}
