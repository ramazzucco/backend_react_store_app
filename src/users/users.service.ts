import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.scahema';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModule: Model <UserDocument>){}

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.usersModule.findOne({ fullname: createUserDto.fullname });
    if(userExist) throw new BadRequestException('USER_ALREADY_EXIST');

    try {
      const user = await this.usersModule.create(createUserDto);
      return user;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  async count() {
    return await this.usersModule.find().count();
  }

  async findAll() {
    try {
      return await this.usersModule.find();
    } catch (error) {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  async findByTeam(team: string) {
    try {
      return await this.usersModule.find({ team: team });
    } catch (error) {
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  async findOne(id: string) {
    try {
      return await this.usersModule.findById(id);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto[]) {
    if(!isValidObjectId(id)) throw new BadRequestException('INVALID_ID');
    try {
      const userUpdated = await this.usersModule.findByIdAndUpdate(id, updateUserDto[0]);
      if(userUpdated) return this.usersModule.findById(id);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }

  async updateAll(updateUserDto: UpdateUserDto[]) {
    const usersUpdated = [];
    await updateUserDto.map( async (user: UpdateUserDto) => {
      if(!isValidObjectId(user._id)) {
        throw new BadRequestException('INVALID_ID');
      } else {
        try {
          const userUpdated = await this.usersModule.findByIdAndUpdate(user._id, user);
          if(userUpdated) usersUpdated.push(await this.usersModule.findById(user._id));
        } catch (error) {
          console.log(error)
          throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
        }
      }
    });
    return usersUpdated;
  }

  async delete(id: string) {
    try {
      const deleted = await this.usersModule.findOneAndDelete({ _id: id });
      if(deleted) return await this.usersModule.find({ team: deleted.team });
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
    }
  }
}
