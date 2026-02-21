/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import 'dotenv/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
  .setTitle('Marketplace API')
  .setDescription('Marketplace API description')
  .setVersion('1.0')
  .addTag('marketplace')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    },
    'access-token',
  )
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: '/swagger/json',
    // customCssUrl: '/swagger-static/swagger-ui.css',
    // customJs: [
    //   '/swagger-static/swagger-ui-bundle.js',
    //   '/swagger-static/swagger-ui-standalone-preset.js',
    // ],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `🚀 Swagger documentation is running on: http://localhost:${port}/swagger`
  );
}

bootstrap();
