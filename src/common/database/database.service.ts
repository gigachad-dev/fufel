import { Injectable, OnModuleInit } from '@nestjs/common'
import { Command } from 'src/enitities/command'
import { Regular } from 'src/enitities/regular'
import { Token } from 'src/enitities/token'
import { DataSource } from 'typeorm'
import { ConfigService } from '../config/config.service'

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly _dataSource: DataSource

  constructor(private readonly configService: ConfigService) {
    this._dataSource = new DataSource({
      ...this.configService.database,
      type: 'postgres',
      entities: [
        Token,
        Command,
        Regular
      ],
      // logging: true,
      synchronize: true
    })
  }

  async onModuleInit(): Promise<void> {
    await this._dataSource.initialize()
    // await this._dataSource.runMigrations()
  }

  get dataSource(): DataSource {
    return this._dataSource
  }
}
