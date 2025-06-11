import { Injectable } from '@nestjs/common';

// interface User {
//   id: string;
//   login: string;
//   password: string;
//   version: number;
//   createdAt: number;
//   updatedAt: number;
// }

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

@Injectable()
export class DatabaseService {
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
  // users: User[] = [];
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
