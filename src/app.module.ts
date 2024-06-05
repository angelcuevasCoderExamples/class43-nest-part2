import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import FirstMiddleware from './middlewares/first.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot(), UsersModule, 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) =>({
        uri: config.get('MONGO_URI') 
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware).forRoutes({path: '*', method: RequestMethod.ALL})
  }
}
