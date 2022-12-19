import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { Client } from '@twurple/auth-tmi'
import { Logger, LoggerService } from 'src/common/logger/logger.service'
import { AuthService } from '../auth/auth.service'

@Injectable()
export class IrcService implements OnApplicationBootstrap {
  protected ircClient: Client
  private readonly logger: Logger

  constructor(
    private readonly loggerService: LoggerService,
    private readonly authService: AuthService
  ) {
    this.logger = this.loggerService.setContext('IRC')
  }

  async onApplicationBootstrap(): Promise<void> {
    this.ircClient = new Client({
      options: {
        debug: true
      },
      connection: {
        secure: true,
        reconnect: true
      },
      logger: this.logger,
      authProvider: this.authService.authProvider,
      channels: ['vs_code']
    })

    await this.ircClient.connect()
  }
}
