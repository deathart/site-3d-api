import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
    @ApiProperty({ type: String })
    @IsString()
    readonly email: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly token: string;
}
