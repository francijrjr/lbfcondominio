import { ArrowDownRight, ArrowUpRight, CircleDollarSign, ClipboardCheck, WalletCards } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ErrorState, LoadingState } from '../components/PageState'
import { useAuth } from '../context/auth-context'
import { api } from '../lib/api'
import type { DashboardData } from '../types'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const date = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' })

export function DashboardPage() {
  const { token, user } = useAuth()
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api<DashboardData>('/api/dashboard', { token }).then(setData).catch((reason: Error) => setError(reason.message))
  }, [token])

  if (error) return <ErrorState message={error} />
  if (!data) return <LoadingState />

  const cards = [
    { label: 'Receitas', value: data.summary.income, icon: ArrowUpRight, tone: 'positive' },
    { label: 'Despesas', value: data.summary.expenses, icon: ArrowDownRight, tone: 'negative' },
    { label: 'Saldo atual', value: data.summary.balance, icon: WalletCards, tone: 'neutral' },
    { label: 'Em atraso', value: data.summary.overdue, icon: CircleDollarSign, tone: 'warning' },
  ]

  return <>
    <header className="page-heading"><div><p className="eyebrow">Setembro · 2026</p><h1>Bom dia, {user?.name.split(' ')[0]}.</h1><p>Aqui está o pulso do condomínio hoje.</p></div><div className="open-tickets"><ClipboardCheck size={21} /><span><strong>{data.summary.openTickets}</strong> chamados abertos</span></div></header>
    <section className="metric-grid">{cards.map(({ label, value, icon: Icon, tone }) => <article className={`metric-card ${tone}`} key={label}><div><span>{label}</span><strong>{money.format(value)}</strong></div><Icon size={23} /></article>)}</section>
    <section className="content-grid">
      <article className="panel"><header><div><p className="eyebrow">Atenção necessária</p><h2>Inadimplência</h2></div><span className="count-badge">{data.delinquent.length}</span></header><div className="list">{data.delinquent.length ? data.delinquent.map((item) => <div className="list-row" key={item.id}><span className="initials">{item.resident.slice(0, 2).toUpperCase()}</span><div><strong>{item.resident}</strong><small>Apartamento {item.apartment} · vence {date.format(new Date(item.dueDate))}</small></div><strong className="amount overdue">{money.format(item.amount)}</strong></div>) : <p className="empty-copy">Nenhuma cobrança em atraso.</p>}</div></article>
      <article className="panel"><header><div><p className="eyebrow">Operação</p><h2>Chamados recentes</h2></div></header><div className="list">{data.recentTickets.length ? data.recentTickets.map((item) => <div className="list-row" key={item.id}><span className="ticket-dot" /><div><strong>{item.title}</strong><small>{item.resident} · {date.format(new Date(item.openedAt))}</small></div><span className="status-pill">{item.status.replace('_', ' ')}</span></div>) : <p className="empty-copy">Nenhum chamado registrado.</p>}</div></article>
    </section>
  </>
}
