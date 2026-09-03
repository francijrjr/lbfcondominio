import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { env } from '../../config/env.js'
import { prisma } from '../../database/prisma.js'

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(['SINDICO', 'MORADOR']),
})

export const authRouter = Router()

authRouter.post('/login', async (request, response) => {
  const credentials = credentialsSchema.parse(request.body)
  const person = await prisma.pessoa.findUnique({
    where: { email: credentials.email.toLowerCase() },
    include: { sindico: true, morador: true },
  })

  if (!person?.ativo || !(await bcrypt.compare(credentials.password, person.senhaHash))) {
    response.status(401).json({ message: 'E-mail ou senha inválidos.' })
    return
  }

  const actualRole = person.sindico ? 'SINDICO' : person.morador ? 'MORADOR' : null

  if (actualRole !== credentials.role) {
    response.status(403).json({ message: 'Perfil de acesso incompatível.' })
    return
  }

  const token = jwt.sign(
    {
      userId: person.id,
      role: actualRole,
      apartmentId: person.morador?.apartamentoId,
    },
    env.JWT_SECRET,
    { expiresIn: '8h' },
  )

  response.json({
    token,
    user: {
      id: person.id,
      name: person.nome,
      email: person.email,
      role: actualRole,
      apartmentId: person.morador?.apartamentoId ?? null,
    },
  })
})
