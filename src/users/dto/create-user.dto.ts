import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  declare name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email address of the user',
  })
  declare email: string;

  @ApiProperty({
    example: 25,
    description: 'Age of the user',
    minimum: 18,
    maximum: 120,
  })
  declare age: number;
}
