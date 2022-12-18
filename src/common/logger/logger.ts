import winston from 'winston'

export class Logger {
  constructor(
    private readonly logger: winston.Logger,
    private readonly context: string
  ) {}

  info(message: string): void {
    this.logger.info(message, { module: this.context })
  }

  warn(message: string): void {
    this.logger.warn(message, { module: this.context })
  }

  error(message: string): void {
    this.logger.error(message, { module: this.context })
  }
}
