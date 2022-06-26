import { ApiProperty } from '@nestjs/swagger';

export class JwtEntity {
  @ApiProperty({
    example: '3600',
    description: 'Time expires',
  })
  expiresIn: number;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'Token',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Account Email',
  })
  email: string;

  constructor(partial: Partial<JwtEntity>) {
    Object.assign(this, partial);
  }
}
