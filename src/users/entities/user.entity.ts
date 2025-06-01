import { CreateUserDto } from '../dto/create-user.dto';

export class User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  constructor(data: CreateUserDto) {
    this.id = crypto.randomUUID();
    this.login = data.login;
    this.password = data.password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
