import { CreateArtistDto } from './createArtist.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {}
