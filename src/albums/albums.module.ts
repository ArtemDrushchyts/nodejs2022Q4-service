import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';

import { Module } from '@nestjs/common';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
