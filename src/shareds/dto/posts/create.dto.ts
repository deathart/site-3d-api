import { IsBoolean, IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ type: String })
  @IsString()
  readonly title: string;

  @ApiProperty({ type: String })
  @IsString()
  readonly content: string;

  @ApiProperty({ type: Date })
  @IsDate()
  readonly date: Date;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  readonly valid: boolean;
}
