import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel : Model<UserDocument>, private config : ConfigService){}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({email: createUserDto.email})
    if(existingUser) { throw new HttpException('There\'s already an user with that email', HttpStatus.BAD_REQUEST) }
    return await this.userModel.create(createUserDto)
  }

  async findAll() {
    console.log("VARIABLE:" + this.config.get('TEST_VAR'))
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userModel.findOne({_id: id});

    return await this.userModel.updateOne({_id: id}, updateUserDto);
  }

  async remove(id: string) {

    return await this.userModel.deleteOne({_id: id});
  }
}
