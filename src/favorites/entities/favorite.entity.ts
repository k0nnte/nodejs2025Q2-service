import { CreateFavoriteDto } from '../dto/create-favorite.dto';

export class Favorite {
  artists: string[];
  tracks: string[];
  albums: string[];
  constructor(data: CreateFavoriteDto) {
    this.artists = data.artists || [];
    this.tracks = data.tracks || [];
    this.albums = data.albums || [];
  }
}
