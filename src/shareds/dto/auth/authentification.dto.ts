import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthentificationDto {
  @ApiProperty({ type: String })
  @IsString()
  readonly email: string;

  @ApiProperty({ type: String })
  @IsString()
  readonly password: string;
}
