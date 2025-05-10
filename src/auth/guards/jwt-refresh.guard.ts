import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['refreshToken'];

    if (!token) return false;

    try {
      const payload = this.jwtService.verify(token);
      return true;
    } catch (err) {
      return false;
    }
  }
}