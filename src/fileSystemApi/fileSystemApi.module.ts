import { Module } from '@nestjs/common';
import { FileSystemApiService } from './fileSystemApi.service';

@Module({
  providers: [FileSystemApiService],
  exports: [FileSystemApiService]
})
export class FileSystemApiModule { }
