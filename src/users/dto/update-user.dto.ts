import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Prop } from '@nestjs/mongoose';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @Prop({ required: true })
    _id: string;
}
