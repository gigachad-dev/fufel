import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common/common.module'
import { TokenService } from './token/token.service'

@Module({
  exports: [],
  imports: [CommonModule],
  providers: [TokenService],
  controllers: []
})
export class ApiModule {}
