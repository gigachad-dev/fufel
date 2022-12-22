import { Injectable, OnModuleInit } from '@nestjs/common'
import {
  AccessToken,
  accessTokenIsExpired,
  RefreshingAuthProvider
} from '@twurple/auth'
import { TokenService } from 'src/api/token/token.service'
import { ConfigService } from 'src/common/config/config.service'

@Injectable()
export class AuthService implements OnModuleInit {
  public authProvider: RefreshingAuthProvider

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
    const initialTokens = {
      accessToken,
      refreshToken,
      expiresIn: 1,
      obtainmentTimestamp: 0,
      scope: scopes
    }

    const tokensFromDb = await this.tokenService.getTokens()
    if (tokensFromDb) {
      const obtainmentTimestamp = tokensFromDb.obtainmentTimestamp.getTime()
      const tokens = { ...tokensFromDb, obtainmentTimestamp }
      const tokensIsExpired = accessTokenIsExpired(tokens)

      if (tokensIsExpired) {
        return initialTokens
      }

      return tokens
    }

    return initialTokens
  }
}
