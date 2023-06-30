import { Controller, Get, Param, Res } from '@nestjs/common';
import { TeamService } from './team.service';
import { Response } from 'express';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const teams = await this.teamService.findAll();
    return res.json(teams);
  }

}
