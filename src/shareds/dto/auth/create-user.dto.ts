import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String })
  @IsString()
  readonly email: string;

  @ApiProperty({ type: String })
  @IsString()
  password: string;
}
