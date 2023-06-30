import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AwardsModel } from '../model/awards.model';

export type TeamsDocument = Teams & Document;

@Schema()
export class Teams {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  awards: AwardsModel;

}

export const TeamsSchema = SchemaFactory.createForClass(Teams);