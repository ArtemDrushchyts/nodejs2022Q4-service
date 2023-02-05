import { ArtistService } from './artist.service';
import { ArtistsController } from './artist.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
