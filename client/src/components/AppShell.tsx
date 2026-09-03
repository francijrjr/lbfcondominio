import {
  Bell,
  Building2,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  ReceiptText,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/auth-context'
import type { PropsWithChildren } from 'react'

const navigation = [
  { to: '/', label: 'Visão geral', icon: LayoutDashboard, end: true },
  { to: '/cobrancas', label: 'Cobranças', icon: ReceiptText },
  { to: '/chamados', label: 'Chamados', icon: ClipboardList },
]

export function AppShell({ children }: PropsWithChildren) {
  const { user, logout } = useAuth()

  return (
    <div className="app-frame">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark"><Building2 size={23} /></span>
          <span><strong>LBF</strong><small>Condomínio</small></span>
        </div>

        <nav className="main-nav" aria-label="Navegação principal">
          <p className="eyebrow">Gestão diária</p>
          {navigation.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}>
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="profile-card">
          <div className="avatar">{user?.name.slice(0, 2).toUpperCase()}</div>
          <div><strong>{user?.name}</strong><small>{user?.role === 'SINDICO' ? 'Síndico' : 'Morador'}</small></div>
          <button type="button" onClick={logout} aria-label="Sair"><LogOut size={18} /></button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div><span className="status-dot" /> Sistema operacional</div>
          <button className="icon-button" type="button" aria-label="Notificações"><Bell size={19} /></button>
        </header>
        <div className="page-content">{children}</div>
      </main>
    </div>
  )
}
