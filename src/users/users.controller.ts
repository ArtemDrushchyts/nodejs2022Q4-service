import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { ErrorMessage } from 'src/constants/messages';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Delete,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { User } from './entities/user.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const user = this.usersService.getOne(id);
    if (user) {
      return user;
    } else {
      throw new Error(ErrorMessage.NON_EXIST_USER);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
    data: CreateUserDto,
  ): Promise<User> {
    const user = await this.usersService.create(data);
    console.log(data, user);
    return user;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
    @Body() data: UpdateUserDto,
  ) {
    try {
      const updateUserData = await this.usersService.update(id, data);
      if (updateUserData) {
        return updateUserData;
      } else {
        throw new NotFoundException(ErrorMessage.NON_EXIST_USER);
      }
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const user = await this.usersService.getOne(id);
    if (user) {
      return await this.usersService.delete(id);
    } else {
      throw new NotFoundException(ErrorMessage.NON_EXIST_USER);
    }
  }
}
