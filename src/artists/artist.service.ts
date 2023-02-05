import { UpdateArtistDto } from './dto/updateArtist.dto';
import { CreateArtistDto } from './dto/createArtist.dto';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './entities/artist.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  getAll = async (): Promise<Artist[]> => {
    return this.artists;
  };

  getOne = async (id: string): Promise<Artist | null> => {
    const artist = this.artists.find((artist) => artist.id === id);
    return artist ? artist : null;
  };

  create = async (data: CreateArtistDto): Promise<Artist> => {
    const uniqueID = uuidv4();
    const artist = {
      ...data,
      id: uniqueID,
    };
    this.artists.push(artist);
    return artist;
  };

  update = async (
    id: string,
    data: UpdateArtistDto,
  ): Promise<Artist | null> => {
    const artist = await this.getOne(id);
    if (!artist) return null;

    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists[index] = {
      ...artist,
      ...data,
    };
    return this.artists[index];
  };

  delete = async (id: string) => {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index === -1) {
      return null;
    } else {
      const [deleteArtist] = this.artists.splice(index, 1);
      return deleteArtist;
    }
  };
}
