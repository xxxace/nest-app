import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path';

function GlobalMiddleware(req: any, res: any, next: () => void) {
  console.log('已进入全局中间件');
  next();
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/images'
  });
  app.use(GlobalMiddleware);
  // app.setGlobalPrefix('/api');
  await app.listen(3060);
}
bootstrap();
