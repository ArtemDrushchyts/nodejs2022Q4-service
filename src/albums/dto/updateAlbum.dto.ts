import { CreateAlbumDto } from './createAlbum.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}
