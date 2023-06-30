import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Position } from '../model/position.model';
import { Role } from '../model/role.model';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, schema: Position })
  position: string;

  @Prop({ required: true, min: 0, max: 99 })
  tshirt_number: number;

  @Prop({ required: true })
  team: string;

  @Prop({ required: true, schema: Role })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);