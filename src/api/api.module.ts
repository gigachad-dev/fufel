import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common/common.module'
import { AuthController } from './auth/auth.controller'
import { AuthService } from './auth/auth.service'

@Module({
  exports: [AuthService],
  imports: [CommonModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class ApiModule {}
