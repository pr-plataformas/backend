import { Controller, Request } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UserMessagePattern, UserRole } from '../common/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(UserMessagePattern.CreateUserMsg)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @MessagePattern(UserMessagePattern.FindAllUsersMsg)
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern(UserMessagePattern.FindOneUserMsg)
  findOne(@Request() req: any, @Payload() { id }: { id: string }) {
    console.log('req', req);
    console.log('id', id);

    return this.usersService.findOne(id);
  }

  @MessagePattern(UserMessagePattern.FindUsersByRoleMsg)
  async getUsersByRole(@Payload() role: UserRole): Promise<User[]> {
    return this.usersService.findUsersByRole(role);
  }

  @MessagePattern(UserMessagePattern.UpdateUserMsg)
  update(
    @Payload()
    { id, updateUserInput }: { id: string; updateUserInput: UpdateUserDto },
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @MessagePattern(UserMessagePattern.RemoveUserMsg)
  remove(@Payload() { id }: { id: string }) {
    return this.usersService.remove(id);
  }
}
