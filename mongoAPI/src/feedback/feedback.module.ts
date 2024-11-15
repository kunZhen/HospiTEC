import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { MongooseModule } from '@nestjs/mongoose'; 
import { FeedbackSchema } from './schemas/feedback.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Feedback', schema: FeedbackSchema}
    ])
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService]
})
export class FeedbackModule {}
