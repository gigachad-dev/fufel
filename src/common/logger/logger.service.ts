import { Injectable } from '@nestjs/common'
import { createLogger, format, transports } from 'winston'
import { Logger } from './logger'

export type { Logger }

@Injectable()
export class LoggerService {
  private readonly formatter = format.combine(
    format.timestamp({
      format: 'Do MMM YYYY, HH:mm:ss'
    }),
    format.printf((info) => {
      const timestamp = `[${info['timestamp']}]`
      const module = info['module'] ? ` (${info['module']}) ` : ' '
      const level = info.level.toUpperCase()

      return `${timestamp}${module}${level}: ${info.message}`
    })
  )

  private readonly logger = createLogger({
    level: 'silly',
    format: format.json(),
    transports: [
      new transports.Console({
        level: 'verbose',
        format: this.formatter
      }),
      new transports.File({
        filename: 'log_error.log',
        level: 'error',
        format: this.formatter
      }),
      new transports.File({
        filename: 'log_info.log',
        level: 'info',
        format: this.formatter
      }),
      new transports.File({
        filename: 'log_full.log',
        format: this.formatter
      })

    ]
  })

  setContext(contextName: string): Logger {
    return new Logger(this.logger, contextName)
  }
}
