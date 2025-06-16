import { CreateUserDto } from '../dto/create-user.dto';

export class User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  constructor(data: CreateUserDto) {
    this.login = data.login;
    this.password = data.password;
    this.version = 1;
  }
}
