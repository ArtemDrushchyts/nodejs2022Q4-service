import { ArtistModule } from './artists/artist.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule, ArtistModule],
})
export class AppModule {}
