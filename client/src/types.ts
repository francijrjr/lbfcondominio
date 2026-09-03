export type UserRole = 'SINDICO' | 'MORADOR'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  apartmentId: string | null
}

export interface DashboardData {
  summary: {
    income: number
    expenses: number
    balance: number
    overdue: number
    openTickets: number
  }
  delinquent: Array<{
    id: string
    resident: string
    apartment: string
    amount: number
    dueDate: string
  }>
  recentTickets: Array<{
    id: string
    title: string
    resident: string
    status: string
    openedAt: string
  }>
}

export interface Charge {
  id: string
  apartment: string
  competence: string
  amount: number
  dueDate: string
  status: string
  paymentDate: string | null
  barcode: string | null
  documentUrl: string | null
}

export interface Ticket {
  id: string
  title: string
  description: string
  category: string
  status: string
  resident: string
  apartment: string
  openedAt: string
}
