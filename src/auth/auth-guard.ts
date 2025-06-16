import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private Jwt: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const aut = req.headers.authorization;
      if (!aut) {
        throw new UnauthorizedException({ message: 'нет авторизации' });
      }
      const [bearer, token] = aut.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'нет авторизации' });
      }
      const user = this.Jwt.verify(token);
      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'нет авторизации' });
    }
  }
}
