import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Constants } from './utils/constants';
import { AllExceptionFilter } from './utils/exception.filter';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const httpsOptions = {
  //   key: fs.readFileSync('./space-secrets/space.key'),
  //   cert: fs.readFileSync('./space-secrets/space.crt'),
  // };
  // const app = await NestFactory.create(AppModule, {
  //   httpsOptions
  // });

  app.useGlobalFilters(new AllExceptionFilter());

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  });

  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

  app.setGlobalPrefix(Constants.API);

  app.enableVersioning({
    type: VersioningType.URI
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8100);
}

bootstrap();


