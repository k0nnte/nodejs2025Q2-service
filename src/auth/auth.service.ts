import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bc from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userserv: UsersService,
    private jwtserv: JwtService,
  ) {}
  async login(dto: CreateUserDto) {
    const user = await this.validate(dto);
    return this.generateToken(user);
  }

  async signup(dto: CreateUserDto) {
    const canditate = await this.userserv.findByLogin(dto.login);
    if (canditate) {
      throw new HttpException(
        'пользователь с таким именем уже есть',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hpass = await bc.hash(dto.password, 5);
    const user = await this.userserv.create({ ...dto, password: hpass });
    return user;
  }

  private async generateToken(user: User) {
    const shema = { user: user.id, login: user.login };
    const token = this.jwtserv.sign(shema);
    const refresh = this.jwtserv.sign(shema, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
    console.log(token, 'hh', refresh);
    return {
      token,
      refresh,
    };
  }

  private async validate(dto: CreateUserDto) {
    const user = await this.userserv.findByLogin(dto.login);
    if (user) {
      const passEqual = await bc.compare(dto.password, user.password);
      if (passEqual) {
        return user;
      }
    }
    throw new UnauthorizedException({
      message: 'не правельный login или password',
    });
  }

  async refresh(dto: string) {
    try {
      const payload = this.jwtserv.verify(dto, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      const user = await this.userserv.findByLogin(payload.login);
      if (!user) {
        throw new ForbiddenException('Refresh не совпал');
      }
      return this.generateToken(user);
    } catch {
      throw new ForbiddenException('неправельный токен');
    }
  }
}
