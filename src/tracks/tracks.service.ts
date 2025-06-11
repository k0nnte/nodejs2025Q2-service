import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTrackDto: CreateTrackDto) {
    const track = new Track(createTrackDto);
    const resp = await this.prisma.track.create({
      data: track,
    });
    return resp;
  }
  async findAll() {
    return await this.prisma.track.findMany();
  }
  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    if (!track) {
      throw new NotFoundException(`track with id ${id} not found`);
    }
    return track;
  }
  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    if (!track) {
      throw new NotFoundException(`track with id ${id} not found`);
    }
    // const index = this.db.tracks.indexOf(track);
    // track.name = updateTrackDto.name || track.name;
    // track.artistId = updateTrackDto.artistId || track.artistId;
    // track.albumId = updateTrackDto.albumId || track.albumId;
    // track.duration = updateTrackDto.duration || track.duration;
    // this.db.tracks[index] = track;
    const resp = await this.prisma.track.update({
      where: {
        id,
      },
      data: updateTrackDto,
    });
    return resp;
  }
  async remove(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    if (!track) {
      throw new NotFoundException(`track with id ${id} not found`);
    }
    await this.prisma.track.delete({
      where: {
        id,
      },
    });
    return null;
  }
}
