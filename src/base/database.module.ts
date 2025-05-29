import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Global() // <-- делает модуль глобальным
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
