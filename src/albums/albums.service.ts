import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAlbumDto: CreateAlbumDto) {
    const albom = new Album(createAlbumDto);
    const resp = await this.prisma.album.create({
      data: albom,
    });
    return resp;
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!album) {
      throw new NotFoundException(`album with id ${id} not found`);
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!album) {
      throw new NotFoundException(`album with id ${id} not found`);
    }
    const resp = await this.prisma.album.update({
      where: {
        id,
      },
      data: updateAlbumDto,
    });
    return resp;
  }

  async remove(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!album) {
      throw new NotFoundException(`album with id ${id} not found`);
    }

    await this.prisma.album.delete({
      where: {
        id,
      },
    });
    return null;
  }
}
