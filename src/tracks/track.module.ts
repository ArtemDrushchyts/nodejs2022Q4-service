import { TracksService } from './track.service';
import { Module } from '@nestjs/common';
import { TracksController } from './track.controller';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
