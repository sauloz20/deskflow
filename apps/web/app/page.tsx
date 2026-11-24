'use client';

import { useState } from 'react';
import { LayoutGrid, Ticket, Palette, Search } from 'lucide-react';
import { Alert, Button, Card, EmptyState, Input, MetricCard, PriorityBadge, StatusBadge, Timeline, type Status, type Priority } from '@deskflow/ui';

const tickets: { id: string; title: string; status: Status; priority: Priority }[] = [
  { id: 'DF-104', title: 'Falha de acesso ao e-mail', status: 'Aberto', priority: 'Alta' },
  { id: 'DF-103', title: 'Configuração de impressora', status: 'Em atendimento', priority: 'Média' },
  { id: 'DF-102', title: 'Acesso à pasta do financeiro', status: 'Aguardando solicitante', priority: 'Baixa' },
  { id: 'DF-101', title: 'Atualização do navegador', status: 'Resolvido', priority: 'Baixa' },
];
const statuses: Status[] = ['Aberto', 'Em atendimento', 'Aguardando solicitante', 'Resolvido', 'Fechado'];

export default function DesignSystem() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status | 'Todos'>('Todos');
  const [notice, setNotice] = useState(false);
  const filtered = tickets.filter(ticket => (status === 'Todos' || ticket.status === status) && `${ticket.id} ${ticket.title}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-slate-200 bg-white p-6 lg:border-b-0 lg:border-r">
        <div className="mb-8 flex items-center gap-3 text-xl font-bold text-primary">
          <svg width="32" height="32" viewBox="0 0 100 100" aria-hidden="true"><path fill="#12465A" d="M0 0H57C81 0 100 19 100 45c0 11-4 21-11 29 3-12 0-22-7-29C75 38 66 35 57 35H0Z"/><path fill="#0D9488" d="M0 100v-10c0-13 11-24 24-24h43c12 0 20-6 23-15 4 7 5 15 1 24C84 91 70 100 55 100Z"/></svg>
          DeskFlow
        </div>
        <nav aria-label="Seções do catálogo" className="grid gap-2 text-sm">
          <a href="#fundamentos" className="flex gap-3 rounded-lg bg-slate-100 p-3 font-semibold"><Palette size={18}/> Fundamentos</a>
          <a href="#componentes" className="flex gap-3 rounded-lg p-3 hover:bg-slate-100"><LayoutGrid size={18}/> Componentes</a>
          <a href="#chamados" className="flex gap-3 rounded-lg p-3 hover:bg-slate-100"><Ticket size={18}/> Chamados</a>
        </nav>
      </aside>
      <main className="min-w-0 p-5 lg:p-10">
        <header className="mb-8"><p className="text-sm font-semibold text-teal-700">DESKFLOW / UI KIT · 0.1</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Design System</h1><p className="mt-2 text-slate-600">Fundação visual do atendimento. Ambiente de demonstração com dados fictícios.</p></header>
        <section id="fundamentos" className="mb-8">
          <h2 className="mb-3 text-lg font-semibold">Fundamentos</h2>
          <Card><div className="grid grid-cols-2 gap-4 sm:grid-cols-4">{[['Azul petróleo','#12465A'],['Esmeralda','#0D9488'],['Fundo','#F8FAFC'],['Texto','#0F172A']].map(([name,color]) => <div key={name}><div className="mb-2 h-16 rounded-lg border border-slate-200" style={{background:color}}/><strong className="block text-sm">{name}</strong><small>{color}</small></div>)}</div><p className="mt-5 text-sm text-slate-600">Geist · escala de espaçamento 4 px · radius 6 / 8 / 12 px</p></Card>
        </section>
        <section id="componentes" className="mb-8">
          <h2 className="mb-3 text-lg font-semibold">Componentes</h2>
          <div className="grid gap-4 xl:grid-cols-2">
            <Card><h3 className="mb-4 font-semibold">Ações e feedback</h3><div className="flex flex-wrap gap-2"><Button onClick={() => setNotice(true)}>Salvar demonstração</Button><Button variant="secondary" onClick={() => setNotice(false)}>Limpar aviso</Button><Button variant="danger" disabled>Excluir</Button></div>{notice && <div className="mt-4"><Alert>Alteração simulada. Nenhum dado foi enviado.</Alert></div>}</Card>
            <Card><h3 className="mb-4 font-semibold">Estados e prioridade</h3><div className="flex flex-wrap gap-2">{statuses.map(s => <StatusBadge key={s} status={s}/>)}</div><div className="mt-3 flex flex-wrap gap-2">{(['Baixa','Média','Alta','Crítica'] as Priority[]).map(p => <PriorityBadge key={p} priority={p}/>)}</div></Card>
          </div>
        </section>
        <section id="chamados">
          <h2 className="mb-3 text-lg font-semibold">Indicadores e fila de chamados</h2>
          <div className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">{statuses.slice(0,4).map(s => <MetricCard key={s} title={s} value={tickets.filter(t => t.status === s).length} onClick={() => { setStatus(s); setQuery(''); }}/>)}</div>
          <Card><div className="mb-4 flex flex-wrap items-end gap-3"><div className="min-w-0 flex-1"><Input id="search" label="Buscar chamado" placeholder="Protocolo ou título" value={query} onChange={e => setQuery(e.target.value)}/></div><div className="df-field"><label htmlFor="status">Status</label><select id="status" value={status} onChange={e => setStatus(e.target.value as Status | 'Todos')}><option>Todos</option>{statuses.map(s => <option key={s}>{s}</option>)}</select></div><Button variant="secondary" onClick={() => {setQuery('');setStatus('Todos');}}><Search size={16} className="mr-2 inline"/>Limpar filtros</Button></div>
          <div className="overflow-x-auto">{filtered.length ? <table><thead><tr><th>Protocolo</th><th>Solicitação</th><th>Status</th><th>Prioridade</th></tr></thead><tbody>{filtered.map(t => <tr key={t.id}><td>{t.id}</td><td>{t.title}</td><td><StatusBadge status={t.status}/></td><td><PriorityBadge priority={t.priority}/></td></tr>)}</tbody></table> : <EmptyState title="Nenhum chamado encontrado" description="Ajuste os filtros para visualizar resultados."/>}</div></Card>
          <div className="mt-4"><Card><h3 className="mb-4 font-semibold">Linha do tempo · exemplo</h3><Timeline events={[{id:'1',label:'Chamado criado',author:'Marina Alves (fictício)',date:'24/11/2026 09:00'},{id:'2',label:'Atribuído à equipe de TI',author:'Pedro Lima (fictício)',date:'24/11/2026 09:15'}]}/></Card></div>
        </section>
      </main>
    </div>
  );
}
