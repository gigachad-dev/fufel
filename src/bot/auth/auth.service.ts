import { Injectable, OnModuleInit } from '@nestjs/common'
import { AccessToken, RefreshingAuthProvider } from '@twurple/auth'
import { AuthService } from 'src/api/auth/auth.service'
import { ConfigService } from 'src/common/config/config.service'
import { Logger, LoggerService } from 'src/common/logger/logger.service'

@Injectable()
export class BotAuthService implements OnModuleInit {
  protected authProvider: RefreshingAuthProvider
  protected logger: Logger

  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
    private readonly authService: AuthService
  ) {
    this.logger = loggerService.setContext(BotAuthService.name)
  }

  async onModuleInit(): Promise<void> {
    const { accessToken, clientId, clientSecret, refreshToken, scopes } =
      this.configService.tokens

    const authTokens = await this.authService.getTokens()
    const initialAuthTokens = (() => {
      if (authTokens) {
        return {
          ...authTokens,
          obtainmentTimestamp: authTokens.obtainmentTimestamp.getTime()
        }
      }

      return {
        accessToken,
        refreshToken,
        expiresIn: 1,
        obtainmentTimestamp: 0,
        scope: scopes
      }
    })()

    this.authProvider = new RefreshingAuthProvider(
      {
        clientId,
        clientSecret,
        onRefresh: (token) => this.onRefreshToken(token)
      },
      initialAuthTokens
    )
  }

  onRefreshToken(token: AccessToken) {
    const tokens = {
      ...token,
      obtainmentTimestamp: new Date(token.obtainmentTimestamp)
    }

    this.authService.refreshAuth(tokens)
  }
}
