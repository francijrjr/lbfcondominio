import { Router } from 'express'
import { prisma } from '../../database/prisma.js'
import { authenticate } from '../../middleware/auth.js'

export const chargesRouter = Router()

chargesRouter.use(authenticate)

chargesRouter.get('/', async (request, response) => {
  const charges = await prisma.cobranca.findMany({
    where:
      request.auth?.role === 'MORADOR'
        ? { apartamentoId: request.auth.apartmentId }
        : undefined,
    include: { apartamento: true, boleto: true, pagamento: true },
    orderBy: { vencimento: 'desc' },
  })

  response.json(
    charges.map((charge) => ({
      id: charge.id,
      apartment: `${charge.apartamento.bloco ? `${charge.apartamento.bloco} · ` : ''}${charge.apartamento.numero}`,
      competence: charge.competencia,
      amount: Number(charge.valor),
      dueDate: charge.vencimento,
      status: charge.status,
      paymentDate: charge.pagamento?.pagoEm ?? null,
      barcode: charge.boleto?.linhaDigitavel ?? null,
      documentUrl: charge.boleto?.urlDocumento ?? null,
    })),
  )
})
