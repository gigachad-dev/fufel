import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common/common.module'

@Module({
  exports: [],
  imports: [CommonModule],
  providers: [],
  controllers: []
})
export class ApiModule {}
