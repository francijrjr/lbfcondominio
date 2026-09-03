import { Plus, X } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { ErrorState, LoadingState } from '../components/PageState'
import { useAuth } from '../context/auth-context'
import { api } from '../lib/api'
import type { Ticket } from '../types'

const date = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })

export function TicketsPage() {
  const { token, user } = useAuth()
  const [tickets, setTickets] = useState<Ticket[] | null>(null)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)

  function loadTickets() {
    api<Ticket[]>('/api/tickets', { token }).then(setTickets).catch((reason: Error) => setError(reason.message))
  }

  useEffect(loadTickets, [token])

  async function createTicket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    try {
      await api('/api/tickets', {
        token,
        method: 'POST',
        body: JSON.stringify({ title: form.get('title'), category: form.get('category'), description: form.get('description') }),
      })
      setShowForm(false)
      loadTickets()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Não foi possível abrir o chamado.')
    }
  }

  if (error) return <ErrorState message={error} />
  if (!tickets) return <LoadingState />

  return <>
    <header className="page-heading"><div><p className="eyebrow">Operação</p><h1>Chamados</h1><p>Solicitações organizadas, do registro à solução.</p></div>{user?.role === 'MORADOR' && <button className="primary-button compact" type="button" onClick={() => setShowForm(true)}><Plus size={18} />Novo chamado</button>}</header>
    <section className="ticket-grid">{tickets.map((ticket) => <article className="ticket-card" key={ticket.id}><div className="ticket-card-top"><span className="category">{ticket.category}</span><span className="status-pill">{ticket.status.replace('_', ' ')}</span></div><h2>{ticket.title}</h2><p>{ticket.description}</p><footer><span>{ticket.resident} · Apt. {ticket.apartment}</span><time>{date.format(new Date(ticket.openedAt))}</time></footer></article>)}</section>
    {!tickets.length && <section className="panel"><p className="empty-copy">Nenhum chamado registrado.</p></section>}
    {showForm && <div className="modal-backdrop" role="presentation"><section className="modal" role="dialog" aria-modal="true" aria-labelledby="ticket-title"><header><div><p className="eyebrow">Nova solicitação</p><h2 id="ticket-title">Abrir chamado</h2></div><button className="icon-button" type="button" onClick={() => setShowForm(false)} aria-label="Fechar"><X /></button></header><form onSubmit={createTicket}><label>Título<input name="title" minLength={4} maxLength={160} required /></label><label>Categoria<select name="category" required><option value="">Selecione</option><option>ELÉTRICA</option><option>HIDRÁULICA</option><option>ESTRUTURAL</option><option>SEGURANÇA</option><option>OUTROS</option></select></label><label>Descrição<textarea name="description" minLength={10} maxLength={4000} rows={5} required /></label><button className="primary-button" type="submit">Registrar chamado</button></form></section></div>}
  </>
}
