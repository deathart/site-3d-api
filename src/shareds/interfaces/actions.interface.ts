import { Document } from 'mongoose';

export interface Actions extends Document {
    readonly bankId: string;
    readonly type: number;
    readonly titre: string;
    readonly comment?: string;
    readonly montant: string;
    readonly date: Date;
    readonly valid: boolean;
}
