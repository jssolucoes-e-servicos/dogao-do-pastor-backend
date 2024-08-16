import { Global, Module } from '@nestjs/common';
import { IbmServlessService } from './services/ivera-cron.service';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';

@Global()
@Module({
  providers: [IbmServlessService, LoggerService],
  exports: [IbmServlessService],
})
export class IbmServlessModule {}
