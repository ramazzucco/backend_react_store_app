import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Teams, TeamsSchema } from './schema/team.scahema';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
    imports: [
        MongooseModule.forFeature([
          {
            name: Teams.name,
            schema: TeamsSchema,
          }
        ])
      ],
      controllers: [TeamController],
      providers: [TeamService]
})
export class TeamModule {}
