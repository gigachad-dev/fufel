import { Module } from '@nestjs/common'
import { ApiModule } from 'src/api/api.module'
import { TokenService } from 'src/api/token/token.service'
import { CommonModule } from 'src/common/common.module'
import { ApiService } from './api/api.service'
import { AuthService } from './auth/auth.service'
import { EventsubService } from './eventsub/eventsub.service'
import { IrcService } from './irc/irc.service'
import { PubsubService } from './pubsub/pubsub.service'

@Module({
  imports: [CommonModule, ApiModule],
  providers: [
    TokenService,
    AuthService,
    ApiService,
    IrcService,
    PubsubService,
    EventsubService
  ]
})
export class BotModule {}
