import { Injectable, OnModuleInit } from '@nestjs/common'
import { AccessToken, RefreshingAuthProvider } from '@twurple/auth'
import { TokenService } from 'src/bot/token/token.service'
import { ConfigService } from 'src/common/config/config.service'
import { Logger } from 'src/common/logger/logger.service'

@Injectable()
export class AuthService implements OnModuleInit {
  protected refreshAuthProvider: RefreshingAuthProvider
  protected logger: Logger

  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService
  ) {}

  get authProvider() {
    return this.refreshAuthProvider
  }

  async onModuleInit(): Promise<void> {
    const { clientId, clientSecret } = this.configService.tokens
    const tokens = await this.initialTokens()

    this.refreshAuthProvider = new RefreshingAuthProvider(
      {
        clientId,
        clientSecret,
        onRefresh: (token) => this.onRefreshToken(token)
      },
      tokens
    )
  }

  onRefreshToken(token: AccessToken) {
    delete token.scope

    const tokens = {
      ...token,
      obtainmentTimestamp: new Date(token.obtainmentTimestamp)
    }

    this.tokenService.saveTokens(tokens)
  }

  async initialTokens() {
    const { accessToken, refreshToken, scopes } = this.configService.tokens
    const authTokens = await this.tokenService.getTokens()

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
  }
}
