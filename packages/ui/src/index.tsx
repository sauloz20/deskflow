import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <button type="button" className={`df-button df-button-${variant} ${className}`} {...props} />;
}

export function Input({ label, id, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; id: string }) {
  return <div className="df-field"><label htmlFor={id}>{label}</label><input id={id} {...props} /></div>;
}

export type Status = 'Aberto' | 'Em atendimento' | 'Aguardando solicitante' | 'Resolvido' | 'Fechado';
export type Priority = 'Baixa' | 'Média' | 'Alta' | 'Crítica';

const statusTone: Record<Status, string> = {
  'Aberto': 'info', 'Em atendimento': 'info', 'Aguardando solicitante': 'warning',
  'Resolvido': 'success', 'Fechado': 'neutral',
};
const priorityTone: Record<Priority, string> = {
  'Baixa': 'neutral', 'Média': 'info', 'Alta': 'warning', 'Crítica': 'danger',
};

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`df-badge df-tone-${statusTone[status]}`}>{status}</span>;
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <span className={`df-badge df-tone-${priorityTone[priority]}`}>{priority}</span>;
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`df-card ${className}`}>{children}</section>;
}

export function MetricCard({ title, value, onClick }: { title: string; value: number; onClick?: () => void }) {
  return <button type="button" className="df-card df-metric" onClick={onClick}><span>{title}</span><strong>{value}</strong><small>Ver chamados →</small></button>;
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="df-empty"><strong>{title}</strong><p>{description}</p></div>;
}

export function Alert({ children, error = false }: { children: ReactNode; error?: boolean }) {
  return <div role={error ? 'alert' : 'status'} className={`df-alert ${error ? 'df-tone-danger' : 'df-tone-info'}`}>{children}</div>;
}

export function Timeline({ events }: { events: { id: string; label: string; author: string; date: string }[] }) {
  return <ol className="df-timeline">{events.map(event => <li key={event.id}><strong>{event.label}</strong><small>{event.author} · {event.date}</small></li>)}</ol>;
}
