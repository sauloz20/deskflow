'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Eye, EyeOff, Layers3, LifeBuoy, ShieldCheck } from 'lucide-react';
import { Button } from '@deskflow/ui';
import Link from 'next/link';
import { Workspace } from './workspace';

const demoEmail = 'demo@deskflow.example';
const demoPassword = 'deskflow-demo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== demoEmail || password !== demoPassword) {
      setError('Use os dados fictícios da demonstração para continuar.');
      return;
    }
    setError('');
    setPassword('');
    setAuthenticated(true);
  }

  if (authenticated) return <Workspace onLogout={() => { setAuthenticated(false); setEmail(''); setPassword(''); setVisible(false); }} />;

  return (
    <main className="df-login">
      <section className="df-login-main" aria-labelledby="login-title">
        <header className="df-login-brand">
          <svg width="34" height="34" viewBox="0 0 100 100" aria-hidden="true"><path fill="#12465A" d="M0 0H57C81 0 100 19 100 45c0 11-4 21-11 29 3-12 0-22-7-29C75 38 66 35 57 35H0Z"/><path fill="#0D9488" d="M0 100v-10c0-13 11-24 24-24h43c12 0 20-6 23-15 4 7 5 15 1 24C84 91 70 100 55 100Z"/></svg>
          <span>DeskFlow</span>
        </header>

        <div className="df-login-content">
          <>
              <span className="df-login-kicker">ACESSO À PLATAFORMA</span>
              <h1 id="login-title" className="df-login-title">Bem-vindo de volta.</h1>
              <p className="df-login-description">Acesse seu ambiente de atendimento e acompanhe suas solicitações.</p>
              <form onSubmit={signIn} className="df-login-form">
                <div className="df-field">
                  <label htmlFor="email">E-mail</label>
                  <input id="email" type="email" autoComplete="username" required placeholder="demo@deskflow.example" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} />
                </div>
                <div className="df-field">
                  <label htmlFor="password">Senha</label>
                  <div className="df-password">
                    <input id="password" type={visible ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={e => { setPassword(e.target.value); setError(''); }} aria-describedby={error ? 'login-error' : undefined} />
                    <button type="button" className="df-eye" onClick={() => setVisible(v => !v)} aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}>{visible ? <EyeOff size={20} aria-hidden="true"/> : <Eye size={20} aria-hidden="true"/>}</button>
                  </div>
                </div>
                {error && <p id="login-error" role="alert" className="df-login-error">{error}</p>}
                <Button type="submit" className="w-full">Entrar <ArrowRight size={17} aria-hidden="true"/></Button>
              </form>
              <div className="df-demo-box">
                <strong>Explore a demonstração</strong>
                <p>Use apenas dados fictícios. Não insira sua senha real.</p>
                <Button variant="secondary" className="w-full" onClick={() => { setEmail(demoEmail); setPassword(demoPassword); setError(''); }}>Preencher dados de demonstração</Button>
              </div>
            </>
        </div>
        <footer className="df-login-footer">
          <span>DeskFlow · Protótipo visual</span>
          <Link href="/design-system">Design System</Link>
        </footer>
      </section>
      <aside className="df-login-aside" aria-label="Sobre o DeskFlow">
        <div className="df-login-aside-content">
          <div className="df-login-chip"><LifeBuoy size={17} aria-hidden="true"/> CENTRAL DE ATENDIMENTO</div>
          <h2>Seu suporte, em um único lugar.</h2>
          <p>Organize demandas, acompanhe cada solicitação e mantenha sua equipe alinhada.</p>
          <div className="df-login-feature"><Layers3 size={22} aria-hidden="true"/><div><strong>Fluxo organizado</strong><span>Solicitações e responsáveis em um só ambiente.</span></div></div>
          <div className="df-login-feature"><ShieldCheck size={22} aria-hidden="true"/><div><strong>Clareza no atendimento</strong><span>Histórico, prioridades e próximos passos.</span></div></div>
        </div>
        <div className="df-login-art" aria-hidden="true"><svg viewBox="0 0 100 100"><path fill="none" stroke="currentColor" strokeWidth="1" d="M0 0H57C81 0 100 19 100 45c0 11-4 21-11 29 3-12 0-22-7-29C75 38 66 35 57 35H0ZM0 100v-10c0-13 11-24 24-24h43c12 0 20-6 23-15 4 7 5 15 1 24C84 91 70 100 55 100Z"/></svg></div>
      </aside>
    </main>
  );
}
