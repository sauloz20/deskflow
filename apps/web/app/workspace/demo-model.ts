import type { Priority, Status } from '@deskflow/ui';

export type Role = 'Solicitante' | 'Atendente' | 'Gestor' | 'Administrador';
export type View = 'Painel' | 'Chamados' | 'Novo chamado' | 'Detalhes' | 'Membros' | 'Equipes' | 'Categorias' | 'Auditoria' | 'Configurações' | 'Perfil';
export type Event = { id: string; label: string; author: string; date: string; timestamp: string; internal?: boolean };
export type Ticket = { id: string; org: string; title: string; description: string; category: string; priority: Priority; status: Status; requester: string; assignee: string; createdAt: string; events: Event[] };
export const roles: Role[] = ['Solicitante', 'Atendente', 'Gestor', 'Administrador'];
export const statuses: Status[] = ['Aberto', 'Em atendimento', 'Aguardando solicitante', 'Resolvido', 'Fechado'];
export const priorities: Priority[] = ['Baixa', 'Média', 'Alta', 'Crítica'];
export const organizations = [{ id: 'aurora', name: 'Aurora Tecnologia', initials: 'AT' }, { id: 'nexo', name: 'Nexo Serviços', initials: 'NS' }];
export const transitions: Record<Status, Status[]> = { 'Aberto': ['Em atendimento'], 'Em atendimento': ['Aguardando solicitante', 'Resolvido'], 'Aguardando solicitante': ['Em atendimento', 'Resolvido'], 'Resolvido': ['Em atendimento', 'Fechado'], 'Fechado': [] };
export const date = () => new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
export const event = (label: string, author: string, internal = false): Event => ({ id: crypto.randomUUID(), label, author, date: date(), timestamp: new Date().toISOString(), internal });
export const initialTickets: Ticket[] = [
  { id: 'DF-101', org: 'aurora', title: 'Falha de acesso ao e-mail', description: 'Não consigo acessar a caixa de entrada corporativa.', category: 'Acessos', priority: 'Alta', status: 'Aberto', requester: 'Marina Alves', assignee: '', createdAt: '2026-11-24T09:00:00-03:00', events: [{id:'a1',label:'Chamado criado',author:'Marina Alves',date:'24/11/2026 09:00',timestamp:'2026-11-24T09:00:00-03:00'}] },
  { id: 'DF-102', org: 'aurora', title: 'Configuração de impressora', description: 'Impressora da recepção não aparece na rede.', category: 'Equipamentos', priority: 'Média', status: 'Em atendimento', requester: 'Marina Alves', assignee: 'Pedro Lima', createdAt: '2026-11-24T08:30:00-03:00', events: [{id:'a2',label:'Chamado criado',author:'Marina Alves',date:'24/11/2026 08:30',timestamp:'2026-11-24T08:30:00-03:00'}] },
  { id: 'DF-103', org: 'aurora', title: 'Atualização de software', description: 'Atualização de aplicativo interno.', category: 'Software', priority: 'Baixa', status: 'Resolvido', requester: 'Rafa Costa', assignee: 'Pedro Lima', createdAt: '2026-11-23T10:00:00-03:00', events: [{id:'a0',label:'Chamado criado',author:'Rafa Costa',date:'23/11/2026 10:00',timestamp:'2026-11-23T10:00:00-03:00'},{id:'a3',label:'Chamado resolvido',author:'Pedro Lima',date:'24/11/2026 10:00',timestamp:'2026-11-24T10:00:00-03:00'}] },
  { id: 'DF-101', org: 'nexo', title: 'Acesso ao portal interno', description: 'Solicitação de acesso ao portal.', category: 'Acessos', priority: 'Média', status: 'Aberto', requester: 'Marina Alves', assignee: '', createdAt: '2026-11-24T08:00:00-03:00', events: [{id:'n1',label:'Chamado criado',author:'Marina Alves',date:'24/11/2026 08:00',timestamp:'2026-11-24T08:00:00-03:00'}] },
];


/** Calendar-day filtering uses the organization's demonstration timezone. */
export function dayInOrganization(timestamp: string) {
  return new Date(timestamp).toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' });
}

export function inPeriod(timestamp: string, from: string, to: string) {
  const day = dayInOrganization(timestamp);
  return (!from || day >= from) && (!to || day <= to);
}

export function chronological(events: Event[]) {
  return [...events].sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
}
