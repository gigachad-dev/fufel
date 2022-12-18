import { Module } from '@nestjs/common'
import { ConfigService } from './config/config.service'
import { DatabaseService } from './database/database.service'
import { LoggerService } from './logger/logger.service'

@Module({
  exports: [
    ConfigService,
    LoggerService,
    DatabaseService
  ],
  providers: [
    ConfigService,
    LoggerService,
    DatabaseService
  ]
})
export class CommonModule {}
