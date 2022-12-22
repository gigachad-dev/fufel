import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { PubSubClient } from '@twurple/pubsub'
import { AuthService } from 'src/bot/auth/auth.service'

@Injectable()
export class PubSubService implements OnApplicationBootstrap {
  private pubsubClient: PubSubClient

  constructor(private readonly authService: AuthService) {}

  async onApplicationBootstrap(): Promise<void> {
    this.pubsubClient = new PubSubClient()

    const userId = await this.pubsubClient.registerUserListener(
      this.authService.authProvider
    )
    await this.pubsubClient.onRedemption(userId, () => {})
    await this.pubsubClient.onBits(userId, () => {})
    await this.pubsubClient.onSubscription(userId, () => {})
  }
}
