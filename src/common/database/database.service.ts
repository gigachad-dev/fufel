import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'
import { ConfigService } from 'src/common/config/config.service'
import { Command } from 'src/entities/Command'
import { Regular } from 'src/entities/Regular'
import { Token } from 'src/entities/Token'
import { DataSource } from 'typeorm'

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  public readonly dataSource: DataSource

  constructor(private readonly configService: ConfigService) {
    this.dataSource = new DataSource({
      type: 'postgres',
      url: this.configService.databaseUrl,
      synchronize: true,
      entities: [
        Token,
        Command,
        Regular
      ]
    })
  }

  async onModuleInit(): Promise<void> {
    await this.dataSource.initialize()
  }

  async onApplicationShutdown(): Promise<void> {
    await this.dataSource.destroy()
  }
}
