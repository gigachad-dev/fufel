import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown
} from '@nestjs/common'
import { ApiClient } from '@twurple/api'
import { ClientCredentialsAuthProvider } from '@twurple/auth'
import { EventSubListener } from '@twurple/eventsub'
import { NgrokAdapter } from '@twurple/eventsub-ngrok'
import { ApiService } from 'src/bot/api/api.service'
import { ConfigService } from 'src/common/config/config.service'

@Injectable()
export class EventSubService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private eventSubClient: EventSubListener
  private eventSubApiClient: ApiClient

  constructor(
    private readonly configService: ConfigService,
    private readonly apiService: ApiService
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const { clientId, clientSecret } = this.configService.tokens

    this.eventSubApiClient = new ApiClient({
      authProvider: new ClientCredentialsAuthProvider(clientId, clientSecret)
    })

    this.eventSubClient = new EventSubListener({
      adapter: new NgrokAdapter(),
      apiClient: this.eventSubApiClient,
      strictHostCheck: true,
      secret: clientSecret
    })

    await this.deleteAllSubscriptions()
    const userId = await this.apiService.apiClient.users.getMe()
    await this.eventSubClient.subscribeToChannelUpdateEvents(
      userId,
      console.dir
    )
    await this.eventSubClient.listen()
  }

  async onApplicationShutdown(): Promise<void> {
    this.deleteAllSubscriptions()
  }

  private async deleteAllSubscriptions(): Promise<void> {
    await this.eventSubApiClient.eventSub.deleteAllSubscriptions()
  }
}
