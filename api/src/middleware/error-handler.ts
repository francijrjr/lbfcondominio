import type { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next,
) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      message: 'Dados inválidos.',
      issues: error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    })
    return
  }

  console.error(error)
  response.status(500).json({ message: 'Não foi possível concluir a operação.' })
}
