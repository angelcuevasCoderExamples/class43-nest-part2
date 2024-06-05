import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    return { status: 'success', payload: result}
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {status:'success', payload: users}
  }

  @Get(':id')
  async  findOne(@Param('id') id: string) {
    const result = await this.usersService.findOne(id);
    return {status:'success', payload: result}
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(id, updateUserDto);
    return {status:'success', payload: result};
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(id);
    return {status:'success', payload: result};
  }
}
