import { Injectable, OnModuleInit } from '@nestjs/common'
import { AccessToken, RefreshingAuthProvider } from '@twurple/auth'
import { TokenService } from 'src/api/token/token.service'
import { ConfigService } from 'src/common/config/config.service'
import { Logger } from 'src/common/logger/logger.service'

@Injectable()
export class AuthService implements OnModuleInit {
  public authProvider: RefreshingAuthProvider
  protected logger: Logger

  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService
  ) {}

  async onModuleInit(): Promise<void> {
    const { clientId, clientSecret } = this.configService.tokens
    const tokens = await this.initialTokens()

    this.authProvider = new RefreshingAuthProvider(
      {
        clientId,
        clientSecret,
        onRefresh: (token) => this.onRefreshToken(token)
      },
      tokens
    )
  }

  onRefreshToken(accessToken: AccessToken): void {
    const tokens = {
      ...accessToken,
      obtainmentTimestamp: new Date(accessToken.obtainmentTimestamp)
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
