import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  const document = new DocumentBuilder()
    .setTitle('DeskFlow API')
    .setDescription('API em desenvolvimento. Apenas o endpoint de saúde está disponível nesta etapa.')
    .setVersion('0.1')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, document));
  await app.listen(Number(process.env.PORT || 3001));
}

void bootstrap();
