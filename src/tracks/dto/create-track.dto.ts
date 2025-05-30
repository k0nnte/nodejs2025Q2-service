import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  @IsOptional()
  artistId: string | null;
  @IsOptional()
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty({ message: 'duration is required' })
  duration: number;
}
