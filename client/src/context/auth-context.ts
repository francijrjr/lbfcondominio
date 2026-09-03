import { createContext, useContext } from 'react'
import type { User, UserRole } from '../types'

export interface AuthContextValue {
  token: string | null
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider.')
  return context
}
