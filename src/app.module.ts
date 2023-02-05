import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
