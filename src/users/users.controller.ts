import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../shareds/guards/jwt-auth.guard';
import { ErrorsInterceptor } from '../shareds/interceptors/errors.interceptor';
import { UsersEntity } from '../shareds/entities/users.entity';

@ApiTags('Users')
@ApiBearerAuth()
@ApiSecurity('bearer')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ type: [UsersEntity], description: 'All Users returned.' })
  @ApiNotFoundResponse({ description: 'Account doesnt exist' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findAll(): Promise<UsersEntity[]> {
    const users = await this.usersService.findAll();

    return users.map((user) => new UsersEntity(user.toJSON()));
  }

  @Get(':email')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ type: UsersEntity, description: 'User by Email returned.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Account doesnt exist' })
  async findOneByEmail(@Param('email') email: string): Promise<UsersEntity> {
    const user = await this.usersService.findOneByEmail(email);

    return new UsersEntity(user.toJSON());
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ type: UsersEntity, description: 'User by ID returned.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Account doesnt exist' })
  async findOneById(@Param('id') id: string): Promise<UsersEntity> {
    const user = await this.usersService.findOneById(id);

    return new UsersEntity(user.toJSON());
  }
}
