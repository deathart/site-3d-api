import { IsBoolean, IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActionDto {
    @ApiProperty({ type: String })
    @IsString()
    readonly bankId: string;

    @ApiProperty({ type: Number })
    @IsString()
    readonly type: number;

    @ApiProperty({ type: String })
    @IsString()
    readonly titre: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly comment: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly montant: string;

    @ApiProperty({ type: Date })
    @IsDate()
    readonly date: Date;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    readonly valid: boolean;
}
