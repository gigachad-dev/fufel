import { Injectable } from '@nestjs/common'
import { AccessToken } from '@twurple/auth/lib'
import { DatabaseService } from 'src/common/database/database.service'
import { Token } from 'src/entities/Token'
import { Repository } from 'typeorm'

interface Tokens extends Omit<AccessToken, 'obtainmentTimestamp'> {
  obtainmentTimestamp: Date
}

@Injectable()
export class TokenService {
  private readonly repository: Repository<Token>

  constructor(private readonly database: DatabaseService) {
    this.repository = this.database.dataSource.getRepository(Token)
  }

  async getTokens(): Promise<Token | null> {
    const tokens = await this.repository
      .createQueryBuilder('token')
      .select('token')
      .orderBy({ 'token.id': 'DESC' })
      .getOne()

    return tokens
  }

  async saveTokens(tokens: Tokens): Promise<void> {
    await this.repository.save(tokens)
  }
}
