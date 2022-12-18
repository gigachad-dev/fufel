import { Injectable } from '@nestjs/common'
import { cleanEnv, num, str } from 'envalid'
import type { Config } from './config.type'

@Injectable()
export class ConfigService {
  protected config: Config

  constructor() {
    this.config = cleanEnv<Config>(process.env, {
      CLIENT_ID: str(),
      CLIENT_SECRET: str(),
      SERVER_HOST: str({ default: '0.0.0.0' }),
      SERVER_PORT: num({ default: 3000 }),
      NODE_ENV: str({ choices: ['development', 'production'] })
    })
  }

  get clientId(): string {
    return this.config.CLIENT_ID
  }

  get clientSecret(): string {
    return this.config.CLIENT_SECRET
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
