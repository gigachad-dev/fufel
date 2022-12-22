import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { ApiClient } from '@twurple/api'
import { AuthService } from 'src/bot/auth/auth.service'

@Injectable()
export class ApiService implements OnApplicationBootstrap {
  public apiClient: ApiClient

  constructor(private readonly authService: AuthService) {}

  async onApplicationBootstrap(): Promise<void> {
    this.apiClient = new ApiClient({
      authProvider: this.authService.authProvider
    })
  }
}
