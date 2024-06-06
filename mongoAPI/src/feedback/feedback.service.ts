import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Feedback } from './interfaces/feedback.interface';
import { CreateFeedBackDTO } from './dto/feedback.dto';

@Injectable()
export class FeedbackService {
    constructor(@InjectModel('Feedback')  readonly feedbackModel: Model<Feedback>) {}

    async getFeedbacks(): Promise<Feedback[]> {
        const feedbacks = await this.feedbackModel.find();
        return feedbacks;
    }

    async getFeedback(serviceID: string): Promise<Feedback[]> {
        const feedbacks = await this.feedbackModel.find({ serviceID }).exec();
        return feedbacks;
    }

    async createFeedback(createFeedbackDTO: CreateFeedBackDTO): Promise<Feedback>{
        const feedback = new this.feedbackModel(createFeedbackDTO);
        return await feedback.save();
    }

    async deleteFeedback(feedbackID: string): Promise<Feedback> {
        const deletedFeedback = await this.feedbackModel.findByIdAndDelete(feedbackID);
        return deletedFeedback;
    }

    async updateFeedback(feedbackID: string, createProductDTO: CreateFeedBackDTO): Promise<Feedback> {
        const updateFeedback = await this.feedbackModel.findByIdAndUpdate(feedbackID,
            createProductDTO, {new: true});
            return updateFeedback;
    }

}
