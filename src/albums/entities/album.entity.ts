import { CreateAlbumDto } from '../dto/create-album.dto';

export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
  constructor(data: CreateAlbumDto) {
    this.id = crypto.randomUUID();
    this.name = data.name;
    this.year = data.year;
    this.artistId = data.artistId || null;
  }
}
