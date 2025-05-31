import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './base/database.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [UsersModule, DatabaseModule, TracksModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
