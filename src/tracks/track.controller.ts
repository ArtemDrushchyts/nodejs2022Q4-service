import { TracksService } from './track.service';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { CreateTrackDto } from './dto/createTrack.dto';
import { Track } from './entities/track.entity';
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

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Track[]> {
    return this.tracksService.getAll();
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
    const track = this.tracksService.getOne(id);
    if (track) {
      return track;
    } else {
      throw new NotFoundException(ErrorMessage.NON_EXIST_TRACK);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateTrackDto): Promise<Track> {
    return await this.tracksService.create(data);
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
    data: UpdateTrackDto,
  ) {
    const track = await this.tracksService.getOne(id);
    if (track) {
      return await this.tracksService.update(id, data);
    } else {
      throw new NotFoundException(ErrorMessage.NON_EXIST_TRACK);
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
    const track = await this.tracksService.delete(id);
    if (!track) {
      throw new NotFoundException(ErrorMessage.NON_EXIST_TRACK);
    }
  }
}
