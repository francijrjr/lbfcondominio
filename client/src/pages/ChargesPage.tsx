import { Copy, Download, ReceiptText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ErrorState, LoadingState } from '../components/PageState'
import { useAuth } from '../context/auth-context'
import { api } from '../lib/api'
import type { Charge } from '../types'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const month = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' })
const date = new Intl.DateTimeFormat('pt-BR')

export function ChargesPage() {
  const { token } = useAuth()
  const [charges, setCharges] = useState<Charge[] | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api<Charge[]>('/api/charges', { token }).then(setCharges).catch((reason: Error) => setError(reason.message))
  }, [token])

  if (error) return <ErrorState message={error} />
  if (!charges) return <LoadingState />

  return <>
    <header className="page-heading"><div><p className="eyebrow">Financeiro</p><h1>Cobranças</h1><p>Acompanhe vencimentos, pagamentos e documentos.</p></div></header>
    <section className="panel table-panel">
      <div className="responsive-table">
        <table><thead><tr><th>Competência</th><th>Unidade</th><th>Vencimento</th><th>Valor</th><th>Status</th><th aria-label="Ações" /></tr></thead>
        <tbody>{charges.map((charge) => <tr key={charge.id}><td><span className="cell-title"><ReceiptText size={17} />{month.format(new Date(charge.competence))}</span></td><td>{charge.apartment}</td><td>{date.format(new Date(charge.dueDate))}</td><td><strong>{money.format(charge.amount)}</strong></td><td><span className={`status-pill status-${charge.status.toLowerCase()}`}>{charge.status}</span></td><td><div className="row-actions">{charge.barcode && <button type="button" title="Copiar linha digitável" onClick={() => navigator.clipboard.writeText(charge.barcode!)}><Copy size={17} /></button>}{charge.documentUrl && <a href={charge.documentUrl} title="Baixar boleto"><Download size={17} /></a>}</div></td></tr>)}</tbody></table>
      </div>
      {!charges.length && <p className="empty-copy">Nenhuma cobrança encontrada.</p>}
    </section>
  </>
}
