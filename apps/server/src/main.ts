/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { config } from 'dotenv';

config(); // This will load the .env file from the root

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //globally applied dto to class
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,         // Automatically strip out properties that aren't in the DTO
    forbidNonWhitelisted: true, // Throw an error if a request contains unexpected properties
    transform: true,         // Automatically transform payloads to match DTO class definitions
  }));
    
  // Enable CORS with default settings
    app.enableCors({
      origin: `${process.env.URL}:${process.env.CLIENT_PORT}`, // Your frontend URL
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true, // Allows sending cookies or other credentials
    });

  const globalPrefix = process.env.GLOBAL_PREFIX;
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.SERVER_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: ${process.env.URL}:${port}/${globalPrefix}`
  );
}

bootstrap();
