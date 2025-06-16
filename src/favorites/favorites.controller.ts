import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtGuard } from 'src/auth/auth-guard';
@UseGuards(JwtGuard)
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':type/:id')
  create(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.create(type, id);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete(':type/:id')
  @HttpCode(204)
  remove(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.remove(type, id);
  }
}
