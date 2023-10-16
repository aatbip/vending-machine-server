import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { FileSystemApiModule } from 'src/fileSystemApi/fileSystemApi.module';

@Module({
  imports: [FileSystemApiModule],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule { }
