import { AlertTriangle, LoaderCircle } from 'lucide-react'

export function LoadingState() {
  return <div className="page-state"><LoaderCircle className="spin" /><p>Organizando as informações…</p></div>
}

export function ErrorState({ message }: { message: string }) {
  return <div className="page-state error-state"><AlertTriangle /><p>{message}</p></div>
}
