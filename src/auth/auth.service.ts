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

    async refreshAccessToken(req: Request, res:Response) {
      const refreshToken = req.cookies['refreshToken'];
      if (!refreshToken) {
        return { message: 'Refresh token missing' };
      }

      try {
        const payload = this.jwtService.verify(refreshToken);
        const userId = payload._id || payload.id;

        const user = await firstValueFrom(
          this.client.send('get-user-by-id', {_id: userId })
        );

        if (!user) {
          return "User not found";
        }

        const cleanUser = {
          id: user._id,
          email: user.email,
          role: user.role,
        };

        const accessToken = this.jwtService.sign(cleanUser, { expiresIn: '15m' });

        res.json({ accessToken});
      } catch (err) {
        res.status(401).json({ message: 'Refresh token fallado' });
      }
    }

    async login(payload: LoginRequestDto, res:Response): Promise<void> {
        try {
          const user = await firstValueFrom(this.client.send('login', payload));
    
          const accessToken = this.jwtService.sign(
            { id: user.id, email: user.email, role: user.role },
            { expiresIn: '15m' }
          );
        
          const refreshToken = this.jwtService.sign(
            { id: user.id },
            { expiresIn: '7d' }
          );

          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // true si usas HTTPS
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
          });
        
          // Retornar solo accessToken al frontend
          res.json({ accessToken});
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
