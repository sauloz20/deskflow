import type { Priority, Status } from '@deskflow/ui';

export type Role = 'Solicitante' | 'Atendente' | 'Gestor' | 'Administrador';
export type View = 'Painel' | 'Chamados' | 'Novo chamado' | 'Detalhes' | 'Membros' | 'Equipes' | 'Categorias' | 'Auditoria' | 'Configurações' | 'Perfil';
export type Event = { id: string; label: string; author: string; date: string; internal?: boolean };
export type Ticket = { id: string; org: string; title: string; description: string; category: string; priority: Priority; status: Status; requester: string; assignee: string; events: Event[] };
export const roles: Role[] = ['Solicitante', 'Atendente', 'Gestor', 'Administrador'];
export const statuses: Status[] = ['Aberto', 'Em atendimento', 'Aguardando solicitante', 'Resolvido', 'Fechado'];
export const priorities: Priority[] = ['Baixa', 'Média', 'Alta', 'Crítica'];
export const organizations = [{ id: 'aurora', name: 'Aurora Tecnologia', initials: 'AT' }, { id: 'nexo', name: 'Nexo Serviços', initials: 'NS' }];
export const transitions: Record<Status, Status[]> = { 'Aberto': ['Em atendimento'], 'Em atendimento': ['Aguardando solicitante', 'Resolvido'], 'Aguardando solicitante': ['Em atendimento', 'Resolvido'], 'Resolvido': ['Em atendimento', 'Fechado'], 'Fechado': [] };
export const date = () => new Date().toLocaleString('pt-BR');
export const event = (label: string, author: string, internal = false): Event => ({ id: crypto.randomUUID(), label, author, date: date(), internal });
export const initialTickets: Ticket[] = [
  { id: 'DF-101', org: 'aurora', title: 'Falha de acesso ao e-mail', description: 'Não consigo acessar a caixa de entrada corporativa.', category: 'Acessos', priority: 'Alta', status: 'Aberto', requester: 'Marina Alves', assignee: '', events: [{id:'a1',label:'Chamado criado',author:'Marina Alves',date:'24/11/2026 09:00'}] },
  { id: 'DF-102', org: 'aurora', title: 'Configuração de impressora', description: 'Impressora da recepção não aparece na rede.', category: 'Equipamentos', priority: 'Média', status: 'Em atendimento', requester: 'Marina Alves', assignee: 'Pedro Lima', events: [{id:'a2',label:'Chamado criado',author:'Marina Alves',date:'24/11/2026 08:30'}] },
  { id: 'DF-103', org: 'aurora', title: 'Atualização de software', description: 'Atualização de aplicativo interno.', category: 'Software', priority: 'Baixa', status: 'Resolvido', requester: 'Rafa Costa', assignee: 'Pedro Lima', events: [{id:'a3',label:'Chamado resolvido',author:'Pedro Lima',date:'24/11/2026 10:00'}] },
  { id: 'DF-101', org: 'nexo', title: 'Acesso ao portal interno', description: 'Solicitação de acesso ao portal.', category: 'Acessos', priority: 'Média', status: 'Aberto', requester: 'Marina Alves', assignee: '', events: [{id:'n1',label:'Chamado criado',author:'Marina Alves',date:'24/11/2026 08:00'}] },
];

