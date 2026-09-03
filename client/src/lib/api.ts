const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'

interface ApiOptions extends RequestInit {
  token?: string | null
}

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { token, headers, ...requestOptions } = options
  const response = await fetch(`${API_URL}${path}`, {
    ...requestOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as {
      message?: string
    } | null
    throw new Error(error?.message ?? 'Não foi possível acessar o serviço.')
  }

  return response.json() as Promise<T>
}
