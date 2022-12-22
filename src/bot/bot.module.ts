import { Module } from '@nestjs/common'
import { ApiModule } from 'src/api/api.module'
import { TokenService } from 'src/api/token/token.service'
import { CommonModule } from 'src/common/common.module'
import { ApiService } from './api/api.service'
import { AuthService } from './auth/auth.service'
import { EventSubService } from './eventsub/eventsub.service'
import { IrcService } from './irc/irc.service'
import { PubSubService } from './pubsub/pubsub.service'

@Module({
  imports: [CommonModule, ApiModule],
  providers: [
    TokenService,
    AuthService,
    ApiService,
    PubSubService,
    EventSubService,
    IrcService
  ]
})
export class BotModule {}
