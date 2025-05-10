import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LoginRequestDto, RegisterRequestDto } from './dto/auth.dto';
import { UserRequestDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';


@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    private client = ClientProxyFactory.create({
        transport: Transport.TCP,
        options: { port: 3001 },
    });

    refreshAccessToken(req: Request, res: Response) {
      const refreshToken = req.cookies['refreshToken'];
      if (!refreshToken) throw new Error('Refresh token missing');
  
      try {
        const payload = this.jwtService.verify(refreshToken);
  
        const accessToken = this.jwtService.sign(
          { sub: payload.sub, email: payload.email, role: payload.role },
          { expiresIn: '15m' },
        );
  
        return { accessToken };
      } catch (err) {
        throw new Error('Invalid refresh token');
      }
    }

    async login(payload: LoginRequestDto, res:Response): Promise<void> {
        try {
          const user = await firstValueFrom(this.client.send('login', payload));
    
          const accessToken = this.jwtService.sign(
            { sub: user._id, email: user.email, role: user.role },
            { expiresIn: '15m' }
          );
        
          const refreshToken = this.jwtService.sign(
            { sub: user._id },
            { expiresIn: '7d' }
          );

          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // true si usas HTTPS
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
          });
        
          // Retornar solo accessToken al frontend
          res.json({ accessToken });
        } catch (error) {
          res.status(401).json({ message: 'Credenciales inválidas' });
        }
        }
      

  register(payload: RegisterRequestDto): Promise<RegisterRequestDto> {
    return firstValueFrom(this.client.send('register', payload));
  }

  changePassword(payload): Promise<string> {
    return firstValueFrom(this.client.send('change-password', payload));
  }

  getUserByEmail(email: string) {
    return firstValueFrom(this.client.send('get-user-by-email', { email }));
  }

  getUserById(_id: string): Promise<UserRequestDto | null> {
    return firstValueFrom(this.client.send('get-user-by-id', { _id }));
  }

  getAllUsers(): Promise<UserRequestDto[]> {
    return firstValueFrom(this.client.send('get-all-users', {}));
  }

  updateUser(_id: string, updateData: Partial<UserRequestDto>): Promise<UserRequestDto> {
    return firstValueFrom(
      this.client.send('update-user', { _id, updateData }),
    );
  }

  deleteUser(_id: string): Promise<string> {
    return firstValueFrom(this.client.send('delete-user', { _id }));
  }
}
