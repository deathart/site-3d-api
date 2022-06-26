import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthentificationDto } from '../shareds/dto/auth/authentification.dto';
import { RefreshTokenDto } from '../shareds/dto/auth/refreshtoken.dto';
import { CreateUserDto } from '../shareds/dto/auth/create-user.dto';
import { ErrorsInterceptor } from '../shareds/interceptors/errors.interceptor';
import { UsersEntity } from 'src/shareds/entities/users.entity';
import { JwtEntity } from 'src/shareds/entities/jwt.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('authentification')
  @UseInterceptors(ErrorsInterceptor)
  @ApiNotFoundResponse({ description: 'Account doesnt exist' })
  async authentification(
    @Body() params: AuthentificationDto,
  ): Promise<JwtEntity> {
    const account = await this.authService.authentification(params);

    if (!account) {
      throw new NotFoundException();
    }

    return await this.authService.createToken(account);
  }

  @Post('refreshtoken')
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ type: JwtEntity, description: 'All Users returned.' })
  @ApiBadRequestResponse({ description: 'invalid signature' })
  async refreshToken(
    @Body() params: RefreshTokenDto,
  ): Promise<JwtEntity | boolean> {
    try {
      const account = await this.authService.checkToken(params);

      return await this.authService.createToken(account.email);
    } catch (e) {
      return false;
    }
  }

  @Post('register')
  @UseInterceptors(ErrorsInterceptor)
  @ApiBody({ type: CreateUserDto })
  async register(@Body() params: CreateUserDto): Promise<UsersEntity> {
    return await this.authService.register(params);
  }
}
