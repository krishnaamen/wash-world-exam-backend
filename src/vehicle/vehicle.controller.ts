import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Delete,
  UseGuards,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import * as jwt from 'jsonwebtoken';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Washplan } from '../washplan/entities/washplan.entity';
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req) {
    console.log('hit3', req.body);
    console.log('hit4', req.user);
    const { licencePlateNumber, model, color, year } = req.body;

    console.log('vehicle controller user in request', req.user);
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    const decoded = jwt.verify(token, 'secret') as jwt.JwtPayload; // Cast decoded to JwtPayload type
    console.log(decoded);
    const user = new User();
    user.id = Number(decoded.id);
    user.username = decoded.username;
    //createVehicleDto.user = user;
    const createVehicleDto = {
      licencePlateNumber,
      model,
      color,
      year,
      user,
    } as unknown as CreateVehicleDto;
    return this.vehicleService.create(createVehicleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.vehicleService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getWashPlan(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const washplan = await this.vehicleService.getWashPlanByVehicleId(id);
    return washplan;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() createVehicleDto: CreateVehicleDto,
  ) {
    console.log(
      'createVehicleDto,user,token',
      createVehicleDto,
      req.user,
      req.headers.authorization,
    );
    return this.vehicleService.update(+id, createVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(+id);
  }
}
