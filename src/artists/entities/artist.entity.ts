import { CreateArtistDto } from '../dto/create-artist.dto';

export class Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(data: CreateArtistDto) {
    this.name = data.name;
    this.grammy = data.grammy;
  }
}
