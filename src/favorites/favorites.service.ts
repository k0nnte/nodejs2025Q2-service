import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(type: string, id: string) {
    const prisma = this.prisma;

    let favorite = await prisma.favorites.findFirst();
    if (!favorite) {
      favorite = await prisma.favorites.create({
        data: {},
      });
    }

    switch (type) {
      case 'artist':
        const artist = await this.prisma.artist.findUnique({
          where: {
            id,
          },
        });
        if (!artist) {
          throw new UnprocessableEntityException(
            "Artist with this id doesn't exist",
          );
        }
        await prisma.favorites.update({
          where: { id: favorite.id },
          data: {
            artists: {
              connect: { id },
            },
          },
        });
        break;
      case 'album':
        const album = await this.prisma.album.findUnique({
          where: {
            id,
          },
        });

        if (!album) {
          throw new UnprocessableEntityException(
            "Album with this id doesn't exist",
          );
        }
        await prisma.favorites.update({
          where: { id: favorite.id },
          data: {
            albums: {
              connect: { id },
            },
          },
        });
        break;
      case 'track':
        const track = await this.prisma.track.findUnique({
          where: {
            id,
          },
        });
        if (!track) {
          throw new UnprocessableEntityException(
            "Track with this id doesn't exist",
          );
        }
        await prisma.favorites.update({
          where: { id: favorite.id },
          data: {
            tracks: {
              connect: { id },
            },
          },
        });

        break;
      default:
        throw new NotFoundException(
          'Invalid request. Allowed types are: artist, album, track.',
        );
    }
  }

  async findAll() {
    const favs = await this.prisma.favorites.findFirst({
      include: {
        albums: true,
        artists: true,
        tracks: true,
      },
    });

    if (!favs) {
      throw new NotFoundException('Favorites not found');
    }

    const { artists, albums, tracks } = favs;
    return { artists, albums, tracks };
  }

  async remove(type: string, id: string) {
    const prisma = this.prisma;

    let favorite = await prisma.favorites.findFirst();
    if (!favorite) {
      favorite = await prisma.favorites.create({
        data: {},
      });
    }
    switch (type) {
      case 'artist':
        const artist = await this.prisma.artist.findUnique({
          where: {
            id,
          },
        });
        if (!artist) {
          throw new UnprocessableEntityException(
            "Artist with this id doesn't exist",
          );
        }
        await prisma.favorites.update({
          where: { id: favorite.id },
          data: {
            artists: {
              disconnect: { id },
            },
          },
        });

        break;
      case 'album':
        const album = await this.prisma.album.findUnique({
          where: {
            id,
          },
        });

        if (!album) {
          throw new UnprocessableEntityException(
            "Album with this id doesn't exist",
          );
        }
        await prisma.favorites.update({
          where: { id: favorite.id },
          data: {
            albums: {
              disconnect: { id },
            },
          },
        });
        break;
      case 'track':
        const track = await this.prisma.track.findUnique({
          where: {
            id,
          },
        });
        if (!track) {
          throw new UnprocessableEntityException(
            "Track with this id doesn't exist",
          );
        }
        await prisma.favorites.update({
          where: { id: favorite.id },
          data: {
            tracks: {
              disconnect: { id },
            },
          },
        });
        break;
      default:
        throw new NotFoundException(
          'Invalid request. Allowed types are: artist, album, track.',
        );
    }
  }
}
