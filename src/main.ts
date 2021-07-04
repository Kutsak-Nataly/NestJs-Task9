import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './error_handler/http-exception.filter';
import { loggerMiddleware } from './error_handler/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.use(loggerMiddleware);
  await app.listen(port);
}

bootstrap().then();
