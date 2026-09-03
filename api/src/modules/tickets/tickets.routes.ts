import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../../database/prisma.js'
import { authenticate, requireRole } from '../../middleware/auth.js'

const createTicketSchema = z.object({
  title: z.string().trim().min(4).max(160),
  description: z.string().trim().min(10).max(4000),
  category: z.string().trim().min(2).max(50),
  apartmentId: z.uuid().optional(),
})

const updateStatusSchema = z.object({
  status: z.enum(['ABERTO', 'EM_ATENDIMENTO', 'CONCLUIDO', 'CANCELADO']),
})

export const ticketsRouter = Router()

ticketsRouter.use(authenticate)

ticketsRouter.get('/', async (request, response) => {
  const tickets = await prisma.chamado.findMany({
    where:
      request.auth?.role === 'MORADOR'
        ? { moradorId: request.auth.userId }
        : undefined,
    include: {
      morador: { include: { pessoa: true, apartamento: true } },
      manutencao: true,
    },
    orderBy: { abertoEm: 'desc' },
  })

  response.json(
    tickets.map((ticket) => ({
      id: ticket.id,
      title: ticket.titulo,
      description: ticket.descricao,
      category: ticket.categoria,
      status: ticket.status,
      resident: ticket.morador.pessoa.nome,
      apartment: ticket.morador.apartamento.numero,
      openedAt: ticket.abertoEm,
    })),
  )
})

ticketsRouter.post('/', requireRole('MORADOR'), async (request, response) => {
  const input = createTicketSchema.parse(request.body)
  const ticket = await prisma.chamado.create({
    data: {
      titulo: input.title,
      descricao: input.description,
      categoria: input.category,
      status: 'ABERTO',
      moradorId: request.auth!.userId,
      apartamentoId: input.apartmentId ?? request.auth!.apartmentId,
    },
  })

  response.status(201).json({ id: ticket.id, status: ticket.status })
})

ticketsRouter.patch('/:id/status', requireRole('SINDICO'), async (request, response) => {
  const input = updateStatusSchema.parse(request.body)
  const ticketId = z.uuid().parse(request.params.id)
  const ticket = await prisma.chamado.update({
    where: { id: ticketId },
    data: { status: input.status },
  })

  response.json({ id: ticket.id, status: ticket.status })
})
