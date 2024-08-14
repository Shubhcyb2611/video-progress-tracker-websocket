import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyStatic from '@fastify/static';
import { join } from 'path';
import fastifyMultipart from 'fastify-multipart';
import { mkdirSync, existsSync } from 'fs'; // Import fs modules

async function bootstrap() {
  // Ensure the uploads directory exists
  const uploadsDir = join(__dirname, '../', 'uploads');
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true });
  }

  // Create the NestJS application with Fastify adapter
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Enable CORS if needed
  app.enableCors();

  // Register Fastify static plugin to serve files
  app.register(fastifyStatic, {
    root: uploadsDir,
    prefix: '/uploads/', // URL prefix for accessing uploaded files
  });

  app.register(fastifyMultipart);

  // Start listening for incoming connections on port 3000
  await app.listen(3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
