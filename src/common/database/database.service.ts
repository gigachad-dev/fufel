import { join } from 'node:path'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { Auth } from 'src/api/auth/auth.entity'
import { DataSource } from 'typeorm'

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly _dataSource: DataSource

  constructor() {
    const databasePath = join(process.cwd(), 'db.sqlite')

    this._dataSource = new DataSource({
      type: 'sqlite',
      database: databasePath,
      entities: [Auth],
      // logging: true,
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
