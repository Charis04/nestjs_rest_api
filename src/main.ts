import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Add 'api' prefix to all routes globally
  app.setGlobalPrefix('api');
  // Enable CORS for all origins
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
