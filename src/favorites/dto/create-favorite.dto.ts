import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  artists: string[];
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tracks: string[];
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  albums: string[];
}
