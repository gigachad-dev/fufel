import { Module } from '@nestjs/common'
import { ApiModule } from 'src/api/api.module'
import { CommonModule } from 'src/common/common.module'
import { BotAuthService } from './auth/auth.service'
import { BotTmiService } from './tmi/tmi.service'

@Module({
  imports: [CommonModule, ApiModule],
  providers: [BotAuthService, BotTmiService]
})
export class BotModule {}
