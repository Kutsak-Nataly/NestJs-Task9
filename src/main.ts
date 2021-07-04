import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './error_handler/http-exception.filter';
import { loggerMiddleware } from './error_handler/logger.middleware';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestExpressApplication } from '@nestjs/platform-express';

const fastyfy = process.env.USE_FASTIFY;
const PORT = process.env.PORT;
const TYPEORM_HOST = process.env.TYPEORM_HOST;

async function bootstrap() {
  if (fastyfy) {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    app.use(loggerMiddleware);
    await app.listen(PORT, TYPEORM_HOST);
    console.log('Run fastyfy');
  } else {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.use(loggerMiddleware);
    await app.listen(PORT, TYPEORM_HOST);
  }
}

bootstrap()
    .then(() => {
      console.log(`App is running on http://${TYPEORM_HOST}:${PORT}`)
    })
    .catch((e) => {
      console.log('Failed to run App', e.message);
    });
