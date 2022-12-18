import { Module } from '@nestjs/common'
import { ApiModule } from './api/api.module'
import { BotModule } from './bot/bot.module'
import { CommonModule } from './common/common.module'

@Module({
  imports: [
    CommonModule,
    ApiModule,
    BotModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
