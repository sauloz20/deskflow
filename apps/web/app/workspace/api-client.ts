/**
 * Transport for the future NestJS REST API. The current demo does not call it.
 * The caller supplies a decoder derived from the approved OpenAPI contract.
 * Never infer authorization from a client-side role.
 */
export class ApiError extends Error {
  constructor(readonly status: number, readonly requestId: string | null) {
    super(status === 401 ? 'Sessão expirada.' : status === 403 ? 'Acesso não permitido.' : 'Não foi possível concluir a solicitação.');
    this.name = 'ApiError';
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH';
  body?: unknown;
  signal?: AbortSignal;
};

export async function requestApi<T>(
  path: string,
  decode: (payload: unknown) => T,
  options: RequestOptions = {},
): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) throw new Error('A API do DeskFlow ainda não foi configurada.');
  if (!path.startsWith('/') || path.startsWith('//')) throw new Error('Caminho de API inválido.');
  const response = await fetch(base.replace(/\/$/, '') + path, {
    method: options.method ?? 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(options.body === undefined ? {} : { 'Content-Type': 'application/json' }),
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    signal: options.signal,
    cache: 'no-store',
  });
  if (!response.ok) throw new ApiError(response.status, response.headers.get('x-request-id'));
  const data: unknown = response.status === 204 ? undefined : await response.json();
  return decode(data);
}

const orgPath = (id: string) => '/organizations/' + encodeURIComponent(id);

export const apiRoutes = {
  login: '/auth/login',
  logout: '/auth/logout',
  me: '/auth/me',
  tickets: (organizationId: string) => orgPath(organizationId) + '/tickets',
  ticket: (organizationId: string, ticketId: string) => orgPath(organizationId) + '/tickets/' + encodeURIComponent(ticketId),
  comments: (organizationId: string, ticketId: string) => orgPath(organizationId) + '/tickets/' + encodeURIComponent(ticketId) + '/comments',
  history: (organizationId: string, ticketId: string) => orgPath(organizationId) + '/tickets/' + encodeURIComponent(ticketId) + '/history',
  dashboard: (organizationId: string) => orgPath(organizationId) + '/dashboard',
  health: '/health',
};
