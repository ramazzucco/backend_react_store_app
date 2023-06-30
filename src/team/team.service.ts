import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teams, TeamsDocument } from './schema/team.scahema';
import { Model } from 'mongoose';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Teams.name) private teamModule: Model<TeamsDocument>,
  ) {}

  async findAll() {
    try {
      return await this.teamModule.find();
    } catch (error) {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }
}
