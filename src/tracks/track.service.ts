import { UpdateTrackDto } from './dto/updateTrack.dto';
import { CreateTrackDto } from './dto/createTrack.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  getAll = async (): Promise<Track[]> => {
    return this.tracks;
  };

  getOne = async (id: string): Promise<Track | null> => {
    const track = this.tracks.find((track) => track.id === id);
    return track ? track : null;
  };

  create = async (data: CreateTrackDto): Promise<Track> => {
    const uniqueID = uuidv4();
    const track = {
      ...data,
      id: uniqueID,
    };
    this.tracks.push(track);
    return track;
  };

  update = async (id: string, data: UpdateTrackDto): Promise<Track | null> => {
    const artist = await this.getOne(id);
    if (!artist) return null;

    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks[index] = {
      ...artist,
      ...data,
    };
    return this.tracks[index];
  };

  delete = async (id: string) => {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      return null;
    } else {
      const [deleteTrack] = this.tracks.splice(index, 1);
      return deleteTrack;
    }
  };
}
