import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { FileSystemApiModule } from './fileSystemApi/fileSystemApi.module';

@Module({
  imports: [CoreModule, FileSystemApiModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
