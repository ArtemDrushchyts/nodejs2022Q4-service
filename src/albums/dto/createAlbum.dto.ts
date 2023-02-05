import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  year: number;

  @IsString()
  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;
}
