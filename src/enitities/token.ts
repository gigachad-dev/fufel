import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('token', { schema: 'public' })
export class Token {
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
