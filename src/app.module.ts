import { TracksModule } from './tracks/track.module';
import { AlbumsModule } from './albums/albums.module';
import { ArtistModule } from './artists/artist.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule, ArtistModule, AlbumsModule, TracksModule],
})
export class AppModule {}
