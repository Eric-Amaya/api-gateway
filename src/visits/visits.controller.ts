import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateVisitaDto } from './dto/CreateVisitaDto';
import { firstValueFrom } from 'rxjs';
import { UpdateVisitaDto } from './dto/UpdateVisitaDto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('visits')
@UseGuards(JwtAuthGuard)
export class VisitsController {
    constructor(
        @Inject('VISITS_SERVICE') private readonly visitsClient: ClientProxy, 
        @Inject('ACTIVITIES_SERVICE')
        private readonly activitiesClient: ClientProxy,
    ) {}

    @Post()
    async create(
        @Body() payload:CreateVisitaDto,
        @Req() req: any,
    ) {
        const data = await firstValueFrom(
            this.visitsClient.send('create_visit', payload)
        );

        if(req.user?.id) {
            await firstValueFrom(this.activitiesClient.send('create-activity', {
                user: req.user.id,
                action: `Registro de una nueva visita`,
            })); 
        }

        return data;
    }

    @Get()
    async getAll() {
        return firstValueFrom(
            this.visitsClient.send('get_all_visits', {})
        );
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return firstValueFrom(
            this.visitsClient.send('get_visit_by_id', id )
        );
    }

    @Patch(':id')
    async update(
        @Param('id') id: string, 
        @Body() payload: UpdateVisitaDto,
        @Req() req: any,
    ) {
        const data = await firstValueFrom(
            this.visitsClient.send('update_visit', { id, payload })
        );

        if(req.user?.id) {
            await firstValueFrom(this.activitiesClient.send('create-activity', {
                user: req.user.id,
                action: `Actualización de la información de una visita - ${data.tipo}`,
            })); 
        }

        return data;
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string,
        @Req() req: any,
    ) {
        const data = await firstValueFrom(
            this.visitsClient.send('delete_visit', id )
        );

        if(req.user?.id) {
            await firstValueFrom(this.activitiesClient.send('create-activity', {
                user: req.user.id,
                action: `Eliminación de una visita - ${data.tipo}`,
            })); 
        }

        return data;
    }

    @Get('search/by-reference')
    async getVisitsByReference(@Query('referenciaId') referenciaId: string) {
        return firstValueFrom(
            this.visitsClient.send('visitas_totales_por_referencia', referenciaId )
        );
    }

    @Get('filter/by-type')
    async filterByType(@Query('tipo') tipo: string, @Query('referenciaId') referenciaId: string) {
        return firstValueFrom(
            this.visitsClient.send('filtrar_por_tipo', { tipo, referenciaId })
        );
    }

    @Patch(':id/status')
    async updateStatus(
        @Param('id') id: string,
        @Req() req: any,
        @Query('estado') estado: string,
        @Query('numeroTomo') numeroTomo?: string,
    ) {
        const data = await firstValueFrom(
            this.visitsClient.send('update_visit_status', { id, estado, numeroTomo })
        );

        if(req.user?.id) {
            await firstValueFrom(this.activitiesClient.send('create-activity', {
                user: req.user.id,
                action: `Actualización del estado de una visita - ${data.tipo}`,
            })); 
        }

        return data;
    }
}
