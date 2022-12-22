import { Injectable } from '@nestjs/common'
import { cleanEnv, num, str } from 'envalid'
import { scopes } from './scopes'
import type { Config } from './config.type'

@Injectable()
export class ConfigService {
  protected config: Config

  constructor() {
    this.config = cleanEnv<Config>(process.env, {
      CLIENT_ID: str(),
      CLIENT_SECRET: str(),
      ACCESS_TOKEN: str(),
      REFRESH_TOKEN: str(),
      DATABASE_URL: str(),
      SERVER_HOST: str({ default: '0.0.0.0' }),
      SERVER_PORT: num({ default: 3000 }),
      NODE_ENV: str({ choices: ['development', 'production'] })
    })
  }

  get tokens() {
    return {
      clientId: this.config.CLIENT_ID,
      clientSecret: this.config.CLIENT_SECRET,
      accessToken: this.config.ACCESS_TOKEN,
      refreshToken: this.config.REFRESH_TOKEN,
      scopes
    }
  }

  get databaseUrl(): string {
    return this.config.DATABASE_URL
  }

  get host(): string {
    return this.config.SERVER_HOST
  }

  get port(): number {
    return this.config.SERVER_PORT
  }

  get isDev(): boolean {
    return this.config.NODE_ENV === 'development'
  }
}
