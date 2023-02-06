import { CreateAlbumDto } from './dto/createAlbum.dto';
import { Injectable } from '@nestjs/common';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  getAll = async (): Promise<Album[]> => {
    return this.albums;
  };

  getOne = async (id: string): Promise<Album | null> => {
    const album = this.albums.find((album) => album.id === id);
    return album ? album : null;
  };

  create = async (data: CreateAlbumDto): Promise<Album> => {
    const uniqueID = uuidv4();
    const album = {
      ...data,
      id: uniqueID,
    };
    this.albums.push(album);
    return album;
  };

  update = async (id: string, data: UpdateAlbumDto): Promise<Album | null> => {
    const album = await this.getOne(id);
    if (!album) return null;

    const index = this.albums.findIndex((album) => album.id === id);
    this.albums[index] = {
      ...album,
      ...data,
    };
    return this.albums[index];
  };

  delete = async (id: string) => {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      return null;
    } else {
      const [deleteAlbum] = this.albums.splice(index, 1);
      return deleteAlbum;
    }
  };
}
