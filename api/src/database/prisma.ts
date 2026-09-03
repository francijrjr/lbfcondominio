import { PrismaMssql } from '@prisma/adapter-mssql'
import { PrismaClient } from '../generated/prisma/client.js'
import { env } from '../config/env.js'

const adapter = new PrismaMssql({
  server: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  options: {
    encrypt: env.DB_ENCRYPT,
    trustServerCertificate: env.DB_TRUST_SERVER_CERTIFICATE,
  },
})

export const prisma = new PrismaClient({ adapter })
