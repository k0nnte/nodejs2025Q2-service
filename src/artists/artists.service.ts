import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/base/database.service';
import { Artist } from './entities/artist.entity';
import delfunc from 'src/delfunc';

@Injectable()
export class ArtistsService {
  constructor(private db: DatabaseService) {}
  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto);
    this.db.artists.push(artist);
    return artist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    const index = this.db.artists.indexOf(artist);
    artist.name = updateArtistDto.name || artist.name;
    artist.grammy = updateArtistDto.grammy ?? artist.grammy;
    this.db.artists[index] = artist;
    return artist;
  }

  remove(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    delfunc('artist', id, this.db);
    this.db.artists = this.db.artists.filter((artist) => artist.id !== id);
    return;
  }
}
