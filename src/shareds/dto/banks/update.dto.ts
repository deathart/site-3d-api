import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDto {
  @ApiProperty({ type: String })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ type: String })
  @IsString()
  readonly name: string;

  @ApiProperty({ type: String })
  @IsString()
  readonly description: string;
}
