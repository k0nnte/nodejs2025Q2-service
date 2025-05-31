import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  name: string;
  @IsNumber()
  @IsNotEmpty({ message: 'year is required' })
  year: number;
  @ValidateIf((_, value) => value !== null)
  @IsUUID()
  artistId?: string | null; // Optional, can be null if no artist is associated
}
