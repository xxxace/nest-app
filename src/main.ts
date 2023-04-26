import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/response';
import { ErrorFilter } from './common/filter';
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import { GlobalGuardGuard } from './common/global.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

function GlobalMiddleware(req: any, res: any, next: () => void) {
  console.log('已进入全局中间件');
  next();
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors());
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/images'
  });
  // 全局中间件
  app.use(GlobalMiddleware);
  // 全局守卫
  app.useGlobalGuards(new GlobalGuardGuard());
  // 全局过滤器
  app.useGlobalFilters(new ErrorFilter());
  // 全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  // 全局管道
  app.useGlobalPipes(new ValidationPipe());
  // swagger docs
  const swaggerOpt = new DocumentBuilder().setTitle('nest-app').setDescription('a nest-app api doc site').build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOpt);
  SwaggerModule.setup('/api-docs', app, swaggerDoc);
  // app.setGlobalPrefix('/api');
  await app.listen(3060);
}
bootstrap();
