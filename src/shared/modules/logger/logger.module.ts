import { Global, Module } from '@nestjs/common';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}