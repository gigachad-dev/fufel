import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('token', { schema: 'public' })
export class Token {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: number

  @Column('text', { name: 'accessToken' })
  accessToken: string

  @Column('text', { name: 'refreshToken' })
  refreshToken: string

  @Column('integer', { name: 'expiresIn' })
  expiresIn: number

  @Column('timestamp', { name: 'obtainmentTimestamp' })
  obtainmentTimestamp: Date
}
