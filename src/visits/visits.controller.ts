import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtRefreshGuard } from '../auth/guards/jwt-refresh.guard';
import { CreateVisitaDto } from './dto/CreateVisitaDto';
import { firstValueFrom } from 'rxjs';
import { UpdateVisitaDto } from './dto/UpdateVisitaDto';

@Controller('visits')
export class VisitsController {
    constructor(
        @Inject('VISITS_SERVICE') private readonly visitsClient: ClientProxy, 
    ) {}

    @Post()
    @UseGuards(JwtRefreshGuard)
    async create(@Body() data:CreateVisitaDto) {
        return firstValueFrom(
            this.visitsClient.send('create_visit', data)
        );
    }

    @Get()
    @UseGuards(JwtRefreshGuard)
    async getAll() {
        return firstValueFrom(
            this.visitsClient.send('get_all_visits', {})
        );
    }

    @Get(':id')
    @UseGuards(JwtRefreshGuard)
    async getById(@Param('id') id: string) {
        return firstValueFrom(
            this.visitsClient.send('get_visit_by_id', id )
        );
    }

    @Patch(':id')
    @UseGuards(JwtRefreshGuard)
    async update(@Param('id') id: string, @Body() data: UpdateVisitaDto) {
        return firstValueFrom(
            this.visitsClient.send('update_visit', { id, data })
        );
    }

    @Delete(':id')
    @UseGuards(JwtRefreshGuard)
    async delete(@Param('id') id: string) {
        return firstValueFrom(
            this.visitsClient.send('delete_visit', id )
        );
    }

    @Get('search/by-reference')
    @UseGuards(JwtRefreshGuard)
    async getVisitsByReference(@Query('referenciaId') referenciaId: string) {
        return firstValueFrom(
            this.visitsClient.send('visitas_totales_por_referencia', referenciaId )
        );
    }

    @Get('filter/by-type')
    @UseGuards(JwtRefreshGuard)
    async filterByType(@Query('tipo') tipo: string, @Query('referenciaId') referenciaId: string) {
        return firstValueFrom(
            this.visitsClient.send('filtrar_por_tipo', { tipo, referenciaId })
        );
    }

    @Patch(':id/status')
    @UseGuards(JwtRefreshGuard)
    async updateStatus(
        @Param('id') id: string,
        @Query('estado') estado: string,
        @Query('numeroTomo') numeroTomo?: string
    ) {
        return firstValueFrom(
            this.visitsClient.send('update_visit_status', { id, estado, numeroTomo })
        );
    }
}
