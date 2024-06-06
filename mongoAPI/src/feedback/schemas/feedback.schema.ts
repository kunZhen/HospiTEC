import { Schema } from 'mongoose';

export const FeedbackSchema = new Schema({
    serviceID: {
        type: Number,
        required: true
    },
    cleanlinessComment: {
        type: String,
        required: true
    },
    cleanlinessRate: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    staffTreatmentComment: {
        type: String,
        required: true
    },
    staffTreatmentRate: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    appointmentPunctualityComment: {
        type: String,
        required: true
    },
    appointmentPunctualityRate: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});

