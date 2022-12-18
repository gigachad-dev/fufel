import { Module } from '@nestjs/common'
import { ConfigService } from './config/config.service'
import { LoggerService } from './logger/logger.service'

@Module({
  providers: [ConfigService, LoggerService]
})
export class CommonModule {}
