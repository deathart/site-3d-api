import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';

export class UsersEntity {
  @ApiProperty({
    example: '5f462704f5632d1b31711c00',
    description: 'The MongoDB objectId of a User',
  })
  @Transform(object => object._id.toHexString())
  _id: string;

  @ApiHideProperty()
  @Exclude()
  __v: number;

  @ApiProperty({
    example: false,
    description: 'If user is setup',
  })
  setup: boolean;

  @ApiProperty({
    example: 'test@test.com',
    description: 'Email user',
  })
  email: string;

  @ApiHideProperty()
  @Exclude()
  password: string;

  constructor(partial: Partial<UsersEntity>) {
    Object.assign(this, partial);
  }
}
