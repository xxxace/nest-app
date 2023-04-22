import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounterMiddleware } from './counter/counter.middleware';
import { SensorModule } from './sensor/sensor.module';
import { ConfigModule } from './config/config.moudle';
import { MyDynamicModule } from './config/dynamic.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nest_app',
      retryDelay: 5000,
      retryAttempts: 10,
      synchronize: true,
      autoLoadEntities: true
    }),
    UserModule,
    SensorModule,
    ConfigModule,
    MyDynamicModule.forRoot('hello dynamic module'),
    UploadModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CounterMiddleware).forRoutes('user')
  }
}
