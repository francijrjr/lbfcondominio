import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export type UserRole = 'SINDICO' | 'MORADOR'

export interface AuthPayload {
  userId: string
  role: UserRole
  apartmentId?: string
}

export function authenticate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authorization = request.headers.authorization

  if (!authorization?.startsWith('Bearer ')) {
    response.status(401).json({ message: 'Autenticação necessária.' })
    return
  }

  try {
    request.auth = jwt.verify(
      authorization.slice('Bearer '.length),
      env.JWT_SECRET,
    ) as AuthPayload
    next()
  } catch {
    response.status(401).json({ message: 'Sessão inválida ou expirada.' })
  }
}

export function requireRole(role: UserRole) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (request.auth?.role !== role) {
      response.status(403).json({ message: 'Você não pode realizar esta ação.' })
      return
    }

    next()
  }
}
