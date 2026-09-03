import { z } from 'zod'

const booleanFromString = z
  .enum(['true', 'false'])
  .default('true')
  .transform((value) => value === 'true')

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3333),
  CLIENT_ORIGIN: z.url().default('http://localhost:5173'),
  JWT_SECRET: z.string().min(32),
  DB_HOST: z.string().min(1).default('localhost'),
  DB_PORT: z.coerce.number().int().positive().default(1433),
  DB_NAME: z.string().min(1).default('lbf_condominio'),
  DB_USER: z.string().min(1).default('sa'),
  DB_PASSWORD: z.string().min(8),
  DB_ENCRYPT: booleanFromString,
  DB_TRUST_SERVER_CERTIFICATE: booleanFromString,
})

export const env = envSchema.parse(process.env)
