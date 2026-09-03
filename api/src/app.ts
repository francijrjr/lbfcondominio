import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { env } from './config/env.js'
import { errorHandler } from './middleware/error-handler.js'
import { authRouter } from './modules/auth/auth.routes.js'
import { chargesRouter } from './modules/charges/charges.routes.js'
import { dashboardRouter } from './modules/dashboard/dashboard.routes.js'
import { ticketsRouter } from './modules/tickets/tickets.routes.js'

export const app = express()

app.use(helmet())
app.use(cors({ origin: env.CLIENT_ORIGIN }))
app.use(express.json({ limit: '1mb' }))

app.get('/health', (_request, response) => {
  response.json({ status: 'ok', service: 'lbf-condominio-api' })
})

app.use('/api/auth', authRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/charges', chargesRouter)
app.use('/api/tickets', ticketsRouter)

app.use((_request, response) => {
  response.status(404).json({ message: 'Rota não encontrada.' })
})

app.use(errorHandler)
