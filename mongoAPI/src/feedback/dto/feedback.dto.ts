export class CreateFeedBackDTO {
    readonly serviceID: number;
    readonly cleanlinessComment: string;
    readonly cleanlinessRate: number;
    readonly staffTreatmentComment: string;
    readonly staffTreatmentRate: number;
    readonly appointmentPunctualityComment: string;
    readonly appointmentPunctualityRate: number;
}
