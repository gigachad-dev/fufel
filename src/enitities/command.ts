import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum CommandUserlevel {
  EVERYONE = 'EVERYONE',
  SUBSCRIBER = 'SUBSCRIBER',
  VIP = 'VIP',
  MODERATOR = 'MODERATOR',
  REGULAR = 'REGULAR'
}

export enum CommandCooldown {
  GLOBAL = 'GLOBAL',
  USER = 'USER'
}

@Entity('command', { schema: 'public' })
export class Command {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: number

  @Column('text', { name: 'name', unique: true })
  name: string

  @Column('text', { name: 'description', nullable: true })
  description: string | null

  @Column('text', { name: 'aliases' })
  aliases: string[]

  @Column('text', {
    name: 'userlevel',
    array: true,
    default: [CommandUserlevel.EVERYONE]
  })
  userlevel: CommandUserlevel[]

  @Column('integer', { name: 'cooldown' })
  cooldown: number

  @Column('enum', {
    name: 'cooldown_type',
    enum: CommandCooldown,
    default: CommandCooldown.GLOBAL
  })
  cooldownType: CommandCooldown

  @Column('boolean', { name: 'enabled' })
  enabled: boolean

  @Column('boolean', { name: 'visible' })
  visible: boolean

  @Column('boolean', { name: 'default', default: false })
  default: boolean

  @Column('text', { name: 'response', nullable: true })
  response: string | null
}
