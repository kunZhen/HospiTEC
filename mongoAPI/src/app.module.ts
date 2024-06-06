import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackModule } from './feedback/feedback.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [FeedbackModule, 
    MongooseModule.forRoot('mongodb://52.70.163.136:27017/hospital-feedback')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
