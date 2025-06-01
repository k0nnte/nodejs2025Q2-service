import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  name: string;
  @IsNumber()
  year: number;

  @ValidateIf((_, value) => value !== null)
  @IsUUID()
  artistId: string | null;
}
