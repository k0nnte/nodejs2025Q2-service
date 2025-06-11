import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto);
    const resp = await this.prisma.artist.create({
      data: artist,
    });
    return resp;
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    const resp = await this.prisma.artist.update({
      where: {
        id,
      },
      data: {
        name: updateArtistDto.name,
        grammy: updateArtistDto.grammy,
      },
    });
    // const index = this.db.artists.indexOf(artist);
    // artist.name = updateArtistDto.name || artist.name;
    // artist.grammy = updateArtistDto.grammy ?? artist.grammy;
    // this.db.artists[index] = artist;

    return resp;
  }

  async remove(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    // delfunc('artist', id, this.db);
    // this.db.artists = this.db.artists.filter((artist) => artist.id !== id);
    await this.prisma.artist.delete({
      where: {
        id,
      },
    });
    return;
  }
}
