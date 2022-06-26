import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcrypt';

import { JwtPayload } from '../shareds/interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { RefreshTokenDto } from '../shareds/dto/auth/refreshtoken.dto';
import { AuthentificationDto } from '../shareds/dto/auth/authentification.dto';
import { CreateUserDto } from '../shareds/dto/auth/create-user.dto';
import { UsersEntity } from 'src/shareds/entities/users.entity';
import { JwtEntity } from 'src/shareds/entities/jwt.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async createToken(account: UsersEntity): Promise<JwtEntity> {
    const user: JwtPayload = { email: account.email };
    const accessToken = this.jwtService.sign(user);

    return new JwtEntity({
      expiresIn: 3600,
      accessToken,
      email: user.email,
    });
  }

  async validateUser(payload: JwtPayload): Promise<UsersEntity> {
    const account = await this.usersService.findOneByEmail(payload.email);

    return new UsersEntity(account.toJSON());
  }

  async authentification(params: AuthentificationDto): Promise<UsersEntity> {
    const account = await this.usersService.checkAuth(params.email);

    if (account && Bcrypt.compareSync(params.password, account.password)) {
      return new UsersEntity(account.toJSON());
    }

    return null;
  }

  async checkToken(params: RefreshTokenDto): Promise<any> {
    return this.jwtService.verify(params.token);
  }

  async register(params: CreateUserDto): Promise<UsersEntity> {
    params.password = Bcrypt.hashSync(params.password, 10);

    const account = await this.usersService.create(params);

    return new UsersEntity(account.toJSON());
  }

  async getUserByToken(token: string): Promise<UsersEntity> {
    const checkToken = this.jwtService.verify(token);

    const account = await this.usersService.findOneByEmail(checkToken.email);

    return new UsersEntity(account.toJSON());
  }
}
