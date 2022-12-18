export interface Config {
  CLIENT_ID: string
  CLIENT_SECRET: string
  ACCESS_TOKEN: string
  REFRESH_TOKEN: string
  SERVER_HOST: string
  SERVER_PORT: number
  POSTGRES_HOST: string
  POSTGRES_PORT: number
  POSTGRES_USER: string
  POSTGRES_PASSWORD: string
  POSTGRES_DATABASE: string
  NODE_ENV: 'development' | 'production'
}
