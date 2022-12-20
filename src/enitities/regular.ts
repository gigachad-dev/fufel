import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('regular', { schema: 'public' })
export class Regular {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: number

  @Column('text', { name: 'user_id', unique: true })
  userId: string

  @Column('text', { name: 'display_name', unique: true })
  displayName: string
}
