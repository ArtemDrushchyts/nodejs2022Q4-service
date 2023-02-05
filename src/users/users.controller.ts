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
  BadRequestException,
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
      throw new NotFoundException(ErrorMessage.NON_EXIST_USER);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
    data: CreateUserDto,
  ): Promise<User> {
    const user = await this.usersService.create(data);
    const userWithoutPass = { ...user };
    delete userWithoutPass.password;
    return userWithoutPass;
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
    @Body(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
    data: UpdateUserDto,
  ) {
    if (!data.newPassword || !data.oldPassword) {
      throw new BadRequestException(ErrorMessage.WRONG_BODY);
    }
    const user = await this.usersService.getOne(id);
    if (!user) {
      throw new NotFoundException(ErrorMessage.NON_EXIST_USER);
    }
    const updateUserData = await this.usersService.update(id, data);
    if (updateUserData) {
      const userWithoutPass = { ...updateUserData };
      delete userWithoutPass.password;
      return userWithoutPass;
    } else {
      throw new NotFoundException(ErrorMessage.NON_EXIST_USER);
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
