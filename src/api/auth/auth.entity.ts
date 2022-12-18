import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('auth', { schema: 'public' })
export class Auth {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: number

  @Column('text', { name: 'accessToken' })
  accessToken: string

  @Column('text', { name: 'refreshToken' })
  refreshToken: string

  @Column('integer', { name: 'expiresIn' })
  expiresIn: number

  @Column('time', { name: 'obtainmentTimestamp' })
  obtainmentTimestamp: Date
}
