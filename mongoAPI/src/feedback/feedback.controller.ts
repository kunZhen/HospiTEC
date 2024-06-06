import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';

import { CreateFeedBackDTO } from './dto/feedback.dto';

import { FeedbackService } from './feedback.service';
import { create } from 'domain';

@Controller('feedback')
export class FeedbackController {

    constructor (private feedbackService: FeedbackService) {}

    @Post('/create')
    async createPost(@Res() res, @Body() createFeedbackDTO: CreateFeedBackDTO) {
        const feedback = await this.feedbackService.createFeedback(createFeedbackDTO);
        console.log(createFeedbackDTO);
        return res.status(HttpStatus.OK).json({
           message: 'feedback received',
           feedback: feedback
        });
    }

    @Get('/')
    async getFeedbacks(@Res() res) {
        const feedbacks = await this.feedbackService.getFeedbacks();
        return res.status(HttpStatus.OK).json({
            feedbacks
        })
    }

    @Get('/:serviceID')
    async getFeedback(@Res() res, @Param('serviceID') serviceID) {
        const feedback = await this.feedbackService.getFeedback(serviceID);
        if (!feedback || feedback.length === 0) throw new NotFoundException('Feedback Does Not Exists');
        return res.status(HttpStatus.OK).json(feedback);        
    }

    @Delete('/delete')
    async deleteFeedback(@Res() res, @Query('feedbackID') feedbackID) {
        const feedbackDeleted = await this.feedbackService.deleteFeedback(feedbackID);
        if (!feedbackDeleted) throw new NotFoundException('Feedback Does Not Exists');
        return res.status(HttpStatus.OK).json({
            message: 'Feedback Deleted  Succesfully',
            feedbackDeleted
        });
        
    }

    @Put('/update')
    async updateFeedback(@Res() res, @Body() createFeedBackDTO: CreateFeedBackDTO, @Query('feedbackID') feedbackID) {
        const updatedFeedback = await this.feedbackService.updateFeedback(feedbackID, createFeedBackDTO);
        if (!updatedFeedback) throw new NotFoundException('Feedback Does Not Exists');
        return res.status(HttpStatus.OK).json({
            message: 'Feedback Updated Successfully',
            updatedFeedback
        });
    }


}
