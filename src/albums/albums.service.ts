import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { DatabaseService } from 'src/base/database.service';
import delfunc from 'src/delfunc';

@Injectable()
export class AlbumsService {
  constructor(private db: DatabaseService) {}
  create(createAlbumDto: CreateAlbumDto) {
    const albom = new Album(createAlbumDto);
    this.db.albums.push(albom);
    return albom;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`album with id ${id} not found`);
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`album with id ${id} not found`);
    }
    Object.assign(album, updateAlbumDto);
    return album;
  }

  remove(id: string) {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`album with id ${id} not found`);
    }
    delfunc('album', id, this.db);
    this.db.albums = this.db.albums.filter((album) => album.id !== id);
    return null;
  }
}
