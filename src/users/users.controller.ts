import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('count')
  count() {
    return this.usersService.count();
  }

  @Get()
  async findAll(@Res() res: Response) {
    const players = await this.usersService.findAll();
    return res.json(players);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('USER_NOT_FOUND');
    return res.json(user);
  }

  @Get('team/:team')
  async find(@Param('team') team: string, @Res() res: Response) {
    const players = await this.usersService.findByTeam(team);
    return res.json(players);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto[],
    @Res() res: Response,
  ) {
    if(id === 'all') {
      const usersUpdated = await this.usersService.updateAll(updateUserDto);
      if (!usersUpdated) {
        throw new InternalServerErrorException('USER_NOT_SAVED');
      }
      return res.json(usersUpdated);
    } else {
      const userUpdated = await this.usersService.update(id, updateUserDto);
      if (!userUpdated) {
        throw new InternalServerErrorException('USER_NOT_SAVED');
      }
      return res.json(userUpdated);
    }
  }

  @Delete(':id')
  async delet(@Param('id') id: string, @Res() res: Response) {
    const users = await this.usersService.delete(id);
    return res.json({ users });
  }
}
