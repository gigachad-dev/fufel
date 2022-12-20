import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { PubSubClient } from '@twurple/pubsub'
import { Logger, LoggerService } from 'src/common/logger/logger.service'
import { ApiService } from '../api/api.service'
import { AuthService } from '../auth/auth.service'

@Injectable()
export class PubsubService implements OnApplicationBootstrap {
  private pubsubClient: PubSubClient
  private logger: Logger

  constructor(
    private readonly apiService: ApiService,
    private readonly authService: AuthService,
    private readonly loggerService: LoggerService
  ) {
    this.logger = loggerService.setContext(PubSubClient.name)
  }

  async onApplicationBootstrap(): Promise<void> {
    this.pubsubClient = new PubSubClient()
    await this.pubsubClient.registerUserListener(this.authService.authProvider)

    const userInfo = await this.apiService.apiClient.users.getMe()
    await this.pubsubClient.onRedemption(userInfo.id, () => {})
    await this.pubsubClient.onBits(userInfo.id, () => {})
    await this.pubsubClient.onSubscription(userInfo.id, () => {})
  }
}
