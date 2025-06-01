import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsBoolean()
  @IsNotEmpty({ message: 'grammy status is required' })
  grammy: boolean;
}
