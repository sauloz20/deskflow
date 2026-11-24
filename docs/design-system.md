# DeskFlow Design System — 0.1

Base visual conforme requisitos v1.1, especialmente RF04, RF08, RF09, RF21, RF22 e RNF04. A demonstração não implementa autenticação, persistência ou autorização real.

## Fundamentos

Azul petróleo #12465A, esmeralda #0D9488, fundo #F8FAFC, texto #0F172A. Para texto sobre fundo claro, usar o esmeralda escuro #0F766E. Geist, espaçamento de 4 px, raios 6/8/12 px. Ícones Lucide com rótulos acessíveis quando interativos.

## Componentes

Button, Input, Card, StatusBadge, PriorityBadge, MetricCard, EmptyState, Alert e Timeline estão na biblioteca compartilhada. A demonstração inclui navegação, filtros, tabela e métricas interativas. Os badges mostram texto além da cor. Controles têm foco visível e campos possuem rótulos. Componentes seguem a abordagem de código aberto do shadcn/ui; integração formal de componentes Radix/shadcn, diálogos, paginação, skeletons e demais estados fica para a próxima entrega.

## Executar

Node.js 22+ e pnpm 10.4.1: `pnpm install`, depois `pnpm dev`. Abrir http://localhost:3000. Validação: `pnpm typecheck` e `pnpm build`. Sem dados reais.

## Checklist

- [x] Tokens e marca integrados.
- [x] Componentes iniciais e catálogo.
- [ ] Instalação, build e teste visual em desktop/360 px.
- [ ] Componentes restantes e fluxos por papel.
- [ ] Aprovação do design definitivo.
