import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [ImportService],
  controllers: [ImportController],
})
export class ImportModule {}
