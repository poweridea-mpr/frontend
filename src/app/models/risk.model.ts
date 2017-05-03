export class RiskLevel {
    static Low = 'low';
    static Medium = 'medium';
    static High = 'high';
}

export interface Risk {
    name: string;
    level: string;
}