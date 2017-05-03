export class RiskLevel {
    static Low = 'Low';
    static Medium = 'Medium';
    static High = 'High';
}

export interface Risk {
    $$index: number;
    $key: string;
    name: string;
    project: string;
    owner: string;
    description: string;
    level: string;
    from: Date;
    to: Date;
    value: number;
}
