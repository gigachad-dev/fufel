import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { Client } from '@twurple/auth-tmi'
import { ApiService } from 'src/bot/api/api.service'
import { AuthService } from 'src/bot/auth/auth.service'
import { Logger, LoggerService } from 'src/common/logger/logger.service'

@Injectable()
export class IrcService implements OnApplicationBootstrap {
  protected ircClient: Client
  private readonly logger: Logger

  constructor(
    private readonly loggerService: LoggerService,
    private readonly authService: AuthService,
    private readonly apiService: ApiService
  ) {
    this.logger = this.loggerService.setContext(IrcService.name)
  }

  async onApplicationBootstrap(): Promise<void> {
    const { displayName } = await this.apiService.apiClient.users.getMe()

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
      channels: [displayName]
    })

    await this.ircClient.connect()
  }
}
