import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DatabaseService } from 'src/base/database.service';

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}
  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    this.db.users.push(user);
    return user;
  }

  findAll() {
    return this.db.users;
  }

  findOne(id: string) {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException('Old password is incorrect');
    }
    const index = this.db.users.indexOf(user);
    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;
    this.db.users[index] = user;
    return user;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
