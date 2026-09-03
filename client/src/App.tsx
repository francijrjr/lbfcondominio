import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { useAuth } from './context/auth-context'
import { ChargesPage } from './pages/ChargesPage'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { TicketsPage } from './pages/TicketsPage'

function ProtectedLayout() {
  const { user } = useAuth()
  return user ? (
    <AppShell>
      <Outlet />
    </AppShell>
  ) : (
    <Navigate to="/login" replace />
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/cobrancas" element={<ChargesPage />} />
        <Route path="/chamados" element={<TicketsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
