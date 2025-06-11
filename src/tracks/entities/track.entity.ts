import { CreateTrackDto } from '../dto/create-track.dto';

export class Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(data: CreateTrackDto) {
    this.id = crypto.randomUUID();
    this.name = data.name;
    this.artistId = data.artistId || null;
    this.albumId = data.albumId || null;
    this.duration = data.duration;
  }
}
