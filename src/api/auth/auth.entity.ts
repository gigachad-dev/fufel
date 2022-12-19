import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('auth', { schema: 'public' })
export class Auth {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  accessToken: string

  @Column()
  refreshToken: string

  @Column()
  expiresIn: number

  @Column()
  obtainmentTimestamp: Date
}
