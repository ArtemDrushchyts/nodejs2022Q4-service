import { ArtistService } from './artist.service';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { CreateArtistDto } from './dto/createArtist.dto';
import { Artist } from './entities/artist.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ErrorMessage } from 'src/constants/messages';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Artist[]> {
    return this.artistsService.getAll();
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
    const artist = this.artistsService.getOne(id);
    if (artist) {
      return artist;
    } else {
      throw new NotFoundException(ErrorMessage.NON_EXIST_ARTIST);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateArtistDto): Promise<Artist> {
    return await this.artistsService.create(data);
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
    data: UpdateArtistDto,
  ) {
    const artist = await this.artistsService.getOne(id);
    if (artist) {
      return await this.artistsService.update(id, data);
    } else {
      throw new NotFoundException(ErrorMessage.NON_EXIST_ARTIST);
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
    const artist = await this.artistsService.delete(id);
    if (!artist) {
      throw new NotFoundException(ErrorMessage.NON_EXIST_ARTIST);
    }
  }
}
