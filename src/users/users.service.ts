import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    const resp = await this.prisma.user.create({
      data: user,
    });
    const { ...userWithoutPasswords } = resp;
    delete userWithoutPasswords.password;
    return {
      ...userWithoutPasswords,
      createdAt: +userWithoutPasswords.createdAt,
      updatedAt: +userWithoutPasswords.updatedAt,
    };
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return { ...user, createdAt: +user.createdAt, updatedAt: +user.updatedAt };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const match = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!match) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (updateUserDto.oldPassword !== match.password) {
      throw new ForbiddenException('Old password is incorrect');
    }
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: { password: updateUserDto.newPassword, version: match.version + 1 },
    });
    const { ...userWithoutPasswords } = user;
    delete userWithoutPasswords.password;
    return {
      ...userWithoutPasswords,
      createdAt: +userWithoutPasswords.createdAt,
      updatedAt: +userWithoutPasswords.updatedAt,
    };
  }

  async remove(id: string) {
    const match = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!match) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  }
}
