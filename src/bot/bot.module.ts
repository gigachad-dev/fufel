import { Module } from '@nestjs/common'
import { ApiModule } from 'src/api/api.module'
import { CommonModule } from 'src/common/common.module'
import { AuthService } from './auth/auth.service'
import { IrcService } from './irc/irc.service'
import { TokenService } from './token/token.service'

@Module({
  imports: [CommonModule, ApiModule],
  providers: [
    TokenService,
    AuthService,
    IrcService
  ]
})
export class BotModule {}
