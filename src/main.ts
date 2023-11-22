import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';

import { AppModule } from './app.module';

import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const swagger = await readFile('./docs/swagger.yml', 'utf-8');

  SwaggerModule.setup('api', app, parse(swagger));

  await app.listen(config.server.port);
}
bootstrap();
