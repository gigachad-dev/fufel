export interface Config {
  CLIENT_ID: string
  CLIENT_SECRET: string
  ACCESS_TOKEN: string
  REFRESH_TOKEN: string
  SERVER_HOST: string
  SERVER_PORT: number
  NODE_ENV: 'development' | 'production'
}
