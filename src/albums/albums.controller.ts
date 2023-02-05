import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { ErrorMessage } from 'src/constants/messages';
import { Album } from './entities/album.entity';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  NotFoundException,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { ValidationPipe } from '@nestjs/common/pipes';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Album[]> {
    return this.albumsService.getAll();
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
    const album = this.albumsService.getOne(id);
    if (album) {
      return album;
    } else {
      throw new NotFoundException(ErrorMessage.NON_EXIST_ALBUM);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateAlbumDto): Promise<Album> {
    return await this.albumsService.create(data);
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
    data: UpdateAlbumDto,
  ) {
    const album = await this.albumsService.getOne(id);
    if (album) {
      return await this.albumsService.update(id, data);
    } else {
      throw new NotFoundException(ErrorMessage.NON_EXIST_ALBUM);
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
  ): Promise<void> {
    const artist = await this.albumsService.delete(id);
    if (!artist) {
      throw new NotFoundException(ErrorMessage.NON_EXIST_ALBUM);
    }
  }
}
