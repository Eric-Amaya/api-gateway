import { Body, ConflictException, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordRequestDto, LoginRequestDto, RegisterRequestDto } from './dto/auth.dto';
import { UserRequestDto } from './dto/user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from './decorators/role.decorator';
import { RolesGuard } from './guards/roles.guard';
import { Request, Response } from 'express';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Role } from './enum/role.enum';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        @Inject('ACTIVITIES_SERVICE')
        private readonly activitiesClient: ClientProxy,
    ) {}

    @Post('login')
    login(
        @Body() payload: LoginRequestDto,
        @Res({ passthrough: true }) res: Response
    ): Promise<void> {
        try {
            return this.authService.login(payload,res);
        } catch (error) {
            throw new Error(
                typeof error === 'string' ? error : error.message || 'Error desconocido'
            );
        }
    }

    @Post('refresh')
    @UseGuards(JwtRefreshGuard)
    refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        return this.authService.refreshAccessToken(req, res);
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false, // true si usas HTTPS
            sameSite: 'lax',
        });
        return res.status(200).json({ message: 'Sesión cerrada' });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post('register')
    async register(
        @Body() payload: RegisterRequestDto,
        @Req() req: any,
    ) {
        try {
            await this.authService.register(payload);
            if (req.user?.id) {
                await firstValueFrom(this.activitiesClient.send('create-activity', {
                    user: req.user.id,
                    action: `Registro de un nuevo usuario`,
                }));
            }

            return { message: 'Usuario registrado correctamente' };

        } catch (error) {
            console.error('Error al registrar usuario:', error);

            if (error instanceof ConflictException) {
            throw error; 
            }

            if (error?.message?.includes('correo ya está registrado')) {
            throw new ConflictException('El correo ya está registrado');
            }

            throw new ConflictException(error?.message || 'Error al registrar usuario');
        }
    }

    @Get('verify-email')
    verifyEmail(@Query('token') token: string): Promise<string> {
        return this.authService.verifyEmail(token);
    }

    @Post('request-password-change')
    requestPasswordChange(@Body('email') email: string): Promise<string> {
        return this.authService.requestPasswordChange(email);
    }

    @Post('change-password')
    changePassword(@Body() payload: ChangePasswordRequestDto): Promise<string> {
        return this.authService.changePassword(payload);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('user')
    getUser(@Query('email') email: string) {
        return this.authService.getUserByEmail(email);
    }

    @UseGuards(JwtAuthGuard)
    @Get('user/:_id')
    getUserById(@Param('_id') _id: string): Promise<UserRequestDto | null> {
        return this.authService.getUserById(_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('users')
    getUsers(): Promise<UserRequestDto[]> {
        return this.authService.getAllUsers();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Put('user/edit/:_id')
    updateUser(
        @Param('_id') _id: string,
        @Body() updateData: Partial<UserRequestDto>,
    ): Promise<UserRequestDto> {
        return this.authService.updateUser(_id, updateData);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete('user/:_id')
    deleteUser(@Param('_id') _id: string): Promise<string> {
        return this.authService.deleteUser(_id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('user/:_id/documents')
    //seGuards(JwtAuthGuard)
    updateUserDocument(
    @Param('_id') _id: string,
    @Body() document: UpdateDocumentDto,
    ) {
    return this.authService.updateUserDocument(_id, document);
    }


}
