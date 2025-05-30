import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  name: string;
  @ValidateIf((_, value) => value !== null)
  @IsUUID()
  artistId: string | null;
  @ValidateIf((_, value) => value !== null)
  @IsUUID()
  albumId: string | null;
  @IsNumber()
  duration: number;
}
