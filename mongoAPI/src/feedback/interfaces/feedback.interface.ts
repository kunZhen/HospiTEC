import { Document } from "mongoose";

export interface Feedback extends Document {
    serviceID: number;
    cleanlinessComment: string;
    cleanlinessRate: number;
    staffTreatmentComment: string;
    staffTreatmentRate: number;
    appointmentPunctualityComment: string;
    appointmentPunctualityRate: number;
}
