import { Router } from 'express'
import { prisma } from '../../database/prisma.js'
import { authenticate } from '../../middleware/auth.js'

export const dashboardRouter = Router()

dashboardRouter.use(authenticate)

dashboardRouter.get('/', async (request, response) => {
  const apartmentFilter =
    request.auth?.role === 'MORADOR'
      ? { apartamentoId: request.auth.apartmentId }
      : undefined

  const [charges, transactions, tickets] = await Promise.all([
    prisma.cobranca.findMany({
      where: apartmentFilter,
      include: {
        apartamento: {
          include: { moradores: { include: { pessoa: true } } },
        },
      },
      orderBy: { vencimento: 'desc' },
    }),
    prisma.transacao.findMany({
      where:
        request.auth?.role === 'MORADOR'
          ? {
              pagamento: {
                cobranca: { apartamentoId: request.auth.apartmentId },
              },
            }
          : undefined,
      orderBy: { data: 'desc' },
    }),
    prisma.chamado.findMany({
      where:
        request.auth?.role === 'MORADOR'
          ? { moradorId: request.auth.userId }
          : undefined,
      include: { morador: { include: { pessoa: true } } },
      orderBy: { abertoEm: 'desc' },
      take: 5,
    }),
  ])

  const income = transactions
    .filter((item) => item.tipo === 'RECEITA')
    .reduce((total, item) => total + Number(item.valor), 0)
  const expenses = transactions
    .filter((item) => item.tipo === 'DESPESA')
    .reduce((total, item) => total + Number(item.valor), 0)
  const overdue = charges.filter((charge) => charge.status === 'VENCIDA')

  response.json({
    summary: {
      income,
      expenses,
      balance: income - expenses,
      overdue: overdue.reduce((total, item) => total + Number(item.valor), 0),
      openTickets: tickets.filter((ticket) => ticket.status !== 'CONCLUIDO').length,
    },
    delinquent: overdue.slice(0, 5).map((charge) => ({
      id: charge.id,
      resident:
        charge.apartamento.moradores.find((item) => item.responsavelFinanceiro)
          ?.pessoa.nome ?? 'Responsável não definido',
      apartment: `${charge.apartamento.bloco ? `${charge.apartamento.bloco} · ` : ''}${charge.apartamento.numero}`,
      amount: Number(charge.valor),
      dueDate: charge.vencimento,
    })),
    recentTickets: tickets.map((ticket) => ({
      id: ticket.id,
      title: ticket.titulo,
      resident: ticket.morador.pessoa.nome,
      status: ticket.status,
      openedAt: ticket.abertoEm,
    })),
  })
})
