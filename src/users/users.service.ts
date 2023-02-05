import { UpdateUserDto } from './dto/updateUser.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { ErrorMessage } from 'src/constants/messages';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAll = async (): Promise<User[]> => {
    return this.users;
  };

  getOne = async (id: string): Promise<User | null> => {
    return this.users.find((user) => user.id === id) || null;
  };

  create = async (data: CreateUserDto): Promise<User> => {
    const timestamp = Date.now();
    const uniqueID = uuidv4();
    const user = {
      ...data,
      id: uniqueID,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.users.push(user);

    return user;
  };

  update = async (id: string, data: UpdateUserDto): Promise<User | null> => {
    const user = await this.getOne(id);
    if (!user) {
      return null;
    }
    if (data.newPassword !== data.oldPassword) {
      throw new Error(ErrorMessage.PASSWORD_WRONG);
    }
    user.version += 1;
    user.password = data.newPassword;
    user.updatedAt = Date.now();
    return user;
  };

  delete = async (id: string) => {
    const index = this.users.findIndex((user) => user.id === id);

    if (index >= 0) {
      const [deleteUser] = this.users.splice(index, 1);
      return deleteUser;
    } else {
      return null;
    }
  };
}
