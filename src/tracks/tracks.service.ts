import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/base/database.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';
// import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private db: DatabaseService) {}
  create(createTrackDto: CreateTrackDto) {
    const track = new Track(createTrackDto);
    this.db.tracks.push(track);
    return track;
  }
  findAll() {
    return this.db.tracks;
  }
  findOne(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`track with id ${id} not found`);
    }
    return track;
  }
  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`track with id ${id} not found`);
    }
    const index = this.db.tracks.indexOf(track);
    track.name = updateTrackDto.name || track.name;
    track.artistId = updateTrackDto.artistId || track.artistId;
    track.albumId = updateTrackDto.albumId || track.albumId;
    track.duration = updateTrackDto.duration || track.duration;
    this.db.tracks[index] = track;
    return track;
  }
  remove(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`track with id ${id} not found`);
    }
    this.db.tracks = this.db.tracks.filter((track) => track.id !== id);
    return track;
  }
}
