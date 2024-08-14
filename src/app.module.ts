import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { VideoController } from './controllers/video.controller';
import { VideoService } from './services/video.service';

@Module({
  imports: [],
  controllers: [UserController , VideoController],
  providers: [PrismaService, UserService , VideoService],
})
export class AppModule {}
