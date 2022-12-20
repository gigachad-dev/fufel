import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { Client } from '@twurple/auth-tmi'
import { Logger, LoggerService } from 'src/common/logger/logger.service'
import { ApiService } from '../api/api.service'
import { AuthService } from '../auth/auth.service'

@Injectable()
export class IrcService implements OnApplicationBootstrap {
  protected ircClient: Client
  private readonly logger: Logger

  constructor(
    private readonly loggerService: LoggerService,
    private readonly apiService: ApiService,
    private readonly authService: AuthService
  ) {
    this.logger = this.loggerService.setContext(IrcService.name)
  }

  async onApplicationBootstrap(): Promise<void> {
    const userInfo = await this.apiService.apiClient.users.getMe()

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
      channels: [userInfo.name]
    })

    await this.ircClient.connect()
  }
}
