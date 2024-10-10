import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URI, {
    }),
    AuthModule, UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

