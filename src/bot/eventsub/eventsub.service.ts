import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown
} from '@nestjs/common'
import { ApiClient } from '@twurple/api'
import { ClientCredentialsAuthProvider } from '@twurple/auth'
import { EventSubListener } from '@twurple/eventsub'
import { NgrokAdapter } from '@twurple/eventsub-ngrok'
import { ConfigService } from 'src/common/config/config.service'
import { ApiService } from '../api/api.service'

@Injectable()
export class EventsubService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private eventsubClient: EventSubListener

  constructor(
    private readonly configService: ConfigService,
    private readonly apiService: ApiService
  ) {}

  async onApplicationBootstrap() {
    const { clientId, clientSecret, scopes } = this.configService.tokens
    this.eventsubClient = new EventSubListener({
      adapter: new NgrokAdapter(),
      apiClient: new ApiClient({
        authProvider: new ClientCredentialsAuthProvider(clientId, clientSecret)
      }),
      strictHostCheck: true,
      secret: clientSecret
    })

    await this.eventsubClient.listen()
  }

  async onApplicationShutdown(signal: string): Promise<void> {}
}
