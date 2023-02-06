import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { join, resolve } from 'path';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { SwaggerModule } from '@nestjs/swagger';

dotenv.config({ path: resolve(process.cwd(), '.env') });

async function bootstrap() {
  const port = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  const doc = await readFile(join(__dirname, '..', 'doc', 'api.yaml'), 'utf-8');
  SwaggerModule.setup('doc', app, parse(doc));
  await app.listen(port);
}
bootstrap();
