import { ArrowRight, Building2, LockKeyhole, Mail } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context'
import type { UserRole } from '../types'

export function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState<UserRole>('MORADOR')
  const [email, setEmail] = useState('morador@lbf.com.br')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to="/" replace />

  function selectRole(nextRole: UserRole) {
    setRole(nextRole)
    setEmail(nextRole === 'SINDICO' ? 'sindico@lbf.com.br' : 'morador@lbf.com.br')
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password, role)
      navigate('/')
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'Não foi possível entrar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-story">
        <div className="brand brand-light">
          <span className="brand-mark"><Building2 size={23} /></span>
          <span><strong>LBF</strong><small>Condomínio</small></span>
        </div>
        <div className="story-copy">
          <p className="eyebrow">Seu condomínio, em ordem</p>
          <h1>Menos planilhas.<br />Mais presença.</h1>
          <p>Finanças, chamados e comunicação reunidos em uma gestão simples de acompanhar.</p>
        </div>
        <div className="building-lines" aria-hidden="true"><span /><span /><span /><span /></div>
      </section>

      <section className="login-panel">
        <form className="login-form" onSubmit={handleSubmit}>
          <div><p className="eyebrow">Acesso seguro</p><h2>Bem-vindo de volta</h2><p>Escolha seu perfil e entre na sua área.</p></div>
          <div className="role-switch" aria-label="Perfil de acesso">
            <button type="button" className={role === 'MORADOR' ? 'active' : ''} onClick={() => selectRole('MORADOR')}>Morador</button>
            <button type="button" className={role === 'SINDICO' ? 'active' : ''} onClick={() => selectRole('SINDICO')}>Síndico</button>
          </div>
          <label>E-mail<div className="field"><Mail size={18} /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div></label>
          <label>Senha<div className="field"><LockKeyhole size={18} /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required /></div></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-button" type="submit" disabled={loading}>{loading ? 'Entrando…' : 'Entrar'}<ArrowRight size={18} /></button>
          <p className="demo-hint">Ambiente de demonstração · senha <strong>123456</strong></p>
        </form>
      </section>
    </main>
  )
}
