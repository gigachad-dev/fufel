import { Injectable, OnModuleInit } from '@nestjs/common'
import { Auth } from 'src/api/auth/auth.entity'
import { DataSource } from 'typeorm'
import { ConfigService } from '../config/config.service'

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly _dataSource: DataSource

  constructor(private readonly configService: ConfigService) {
    this._dataSource = new DataSource({
      ...this.configService.database,
      type: 'postgres',
      entities: [Auth],
      logging: true,
      synchronize: true
    })
  }

  async onModuleInit(): Promise<void> {
    await this._dataSource.initialize()
  }

  get dataSource(): DataSource {
    return this._dataSource
  }
}
