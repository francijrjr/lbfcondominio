import {
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { api } from '../lib/api'
import type { User, UserRole } from '../types'
import { AuthContext } from './auth-context'

const STORAGE_KEY = 'lbf:session'
function getStoredSession() {
  const value = localStorage.getItem(STORAGE_KEY)
  if (!value) return { token: null, user: null }

  try {
    return JSON.parse(value) as { token: string; user: User }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return { token: null, user: null }
  }
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState(getStoredSession)

  async function login(email: string, password: string, role: UserRole) {
    const nextSession = await api<{ token: string; user: User }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession))
    setSession(nextSession)
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    setSession({ token: null, user: null })
  }

  const value = useMemo(() => ({ ...session, login, logout }), [session])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
