import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsUUID()
  artistId: string;
  @IsOptional()
  @IsUUID()
  albumId: string;
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
