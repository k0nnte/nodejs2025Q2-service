import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DatabaseService } from 'src/base/database.service';

@Injectable()
export class FavoritesService {
  constructor(private db: DatabaseService) {}
  create(type: string, id: string) {
    switch (type) {
      case 'artist':
        if (!this.db.artists.find((artist) => artist.id === id)) {
          throw new UnprocessableEntityException(
            "Artist with this id doesn't exist",
          );
        }
        this.db.favorites.artists.push(id);

        break;
      case 'album':
        if (!this.db.albums.find((album) => album.id === id)) {
          throw new UnprocessableEntityException(
            "Album with this id doesn't exist",
          );
        }
        this.db.favorites.albums.push(id);
        break;
      case 'track':
        if (!this.db.tracks.find((track) => track.id === id)) {
          throw new UnprocessableEntityException(
            "Track with this id doesn't exist",
          );
        }
        this.db.favorites.tracks.push(id);
        break;
      default:
        throw new NotFoundException(
          'Invalid request. Allowed types are: artist, album, track.',
        );
    }
  }

  findAll() {
    const {
      artists: favArtistIds,
      albums: favAlbumIds,
      tracks: favTrackIds,
    } = this.db.favorites;
    const artists = this.db.artists.filter((artist) =>
      favArtistIds.includes(artist.id),
    );
    const albums = this.db.albums.filter((album) =>
      favAlbumIds.includes(album.id),
    );
    const tracks = this.db.tracks.filter((track) =>
      favTrackIds.includes(track.id),
    );
    return { artists, albums, tracks };
  }

  remove(type: string, id: string) {
    switch (type) {
      case 'artist':
        if (!this.db.favorites.artists.includes(id)) {
          throw new NotFoundException("Artist with this id isn't in favorites");
        }
        this.db.favorites.artists = this.db.favorites.artists.filter(
          (favId) => favId !== id,
        );
        break;
      case 'album':
        if (!this.db.favorites.albums.includes(id)) {
          throw new NotFoundException("Album with this id isn't in favorites");
        }
        this.db.favorites.albums = this.db.favorites.albums.filter(
          (favId) => favId !== id,
        );
        break;
      case 'track':
        if (!this.db.favorites.tracks.includes(id)) {
          throw new NotFoundException("Track with this id isn't in favorites");
        }
        this.db.favorites.tracks = this.db.favorites.tracks.filter(
          (favId) => favId !== id,
        );
        break;
      default:
        throw new NotFoundException(
          'Invalid request. Allowed types are: artist, album, track.',
        );
    }
  }
}
