import { Injectable, OnModuleInit } from '@nestjs/common'
import { Client } from '@twurple/auth-tmi'
import { BotAuthService } from '../auth/auth.service'

@Injectable()
export class BotTmiService implements OnModuleInit {
  protected ircClient: Client

  constructor(private readonly botAuthService: BotAuthService) {}

  async onModuleInit(): Promise<void> {
    this.ircClient = new Client({
      options: {
        debug: true
      },
      connection: {
        secure: true,
        reconnect: true
      },
      authProvider: this.botAuthService.authProvider,
      channels: ['vs_code']
    })

    await this.ircClient.connect()
  }
}
