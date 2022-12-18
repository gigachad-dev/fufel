import { Injectable } from '@nestjs/common'
import { AccessToken } from '@twurple/auth/lib'
import { DatabaseService } from 'src/common/database/database.service'
import { Repository } from 'typeorm'
import { Auth } from './auth.entity'

interface Tokens extends Omit<AccessToken, 'obtainmentTimestamp'> {
  obtainmentTimestamp: Date
}

@Injectable()
export class AuthService {
  private readonly repository: Repository<Auth>

  constructor(private readonly database: DatabaseService) {
    this.repository = this.database.dataSource.getRepository(Auth)
  }

  async getTokens(): Promise<Auth | null> {
    return await this.repository.findOne({ where: { id: 1 } })
  }

  async refreshAuth(tokens: Tokens): Promise<void> {
    await this.repository.upsert(
      {
        id: 1,
        ...tokens
      },
      []
    )
  }
}
