import { ArrowUpRight } from 'lucide-react';
import { Card, PriorityBadge, StatusBadge } from '@deskflow/ui';
import { statuses, type Ticket } from './demo-model';

export function TicketQueue({ tickets, onOpen }: { tickets: Ticket[]; onOpen: (id: string) => void }) {
  if (!tickets.length) return null;

  return (
    <>
      <div className="df-product-table">
        <table>
          <caption className="sr-only">Chamados encontrados</caption>
          <thead>
            <tr><th scope="col">Chamado</th><th scope="col">Status</th><th scope="col">Prioridade</th><th scope="col">Responsável</th></tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td><button className="df-ticket-link" onClick={() => onOpen(ticket.id)}><small>{ticket.id} · {ticket.category}</small><strong>{ticket.title}</strong></button></td>
                <td><StatusBadge status={ticket.status}/></td>
                <td><PriorityBadge priority={ticket.priority}/></td>
                <td>{ticket.assignee || 'Sem responsável'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="df-product-list">
        {tickets.map(ticket => (
          <button key={ticket.id} className="df-ticket-card" onClick={() => onOpen(ticket.id)}>
            <span className="df-ticket-card-title"><small>{ticket.id} · {ticket.category}</small><strong>{ticket.title}</strong></span>
            <ArrowUpRight size={17} aria-hidden="true" className="df-ticket-card-arrow"/>
            <span className="df-ticket-card-badges"><StatusBadge status={ticket.status}/><PriorityBadge priority={ticket.priority}/></span>
            <small>Responsável: {ticket.assignee || 'Sem responsável'}</small>
          </button>
        ))}
      </div>
    </>
  );
}

export function StatusDistribution({ tickets }: { tickets: Ticket[] }) {
  return (
    <Card className="mt-4 df-distribution">
      <div className="df-panel-header">
        <div><h2 className="df-panel-title">Distribuição por status</h2><p>Composição dos chamados criados no período.</p></div>
        <strong className="df-distribution-total">{tickets.length} total</strong>
      </div>
      {tickets.length === 0 ? <p className="df-empty">Nenhum chamado neste período.</p> : (
        <ul className="df-distribution-list">
          {statuses.map(status => {
            const count = tickets.filter(ticket => ticket.status === status).length;
            return <li key={status}><span>{status}</span><span className="df-chart-track" aria-hidden="true"><span className="df-chart-fill" data-status={status} style={{ width: (count / tickets.length * 100) + '%' }}/></span><strong>{count}</strong></li>;
          })}
        </ul>
      )}
    </Card>
  );
}
