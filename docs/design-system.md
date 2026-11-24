# DeskFlow Design System — 0.1

Base visual conforme requisitos v1.1, especialmente RF04, RF08, RF09, RF21, RF22 e RNF04. A demonstração não implementa autenticação, persistência ou autorização real.

## Fundamentos

Azul petróleo #12465A, esmeralda #0D9488, fundo #F8FAFC, texto #0F172A. Para texto sobre fundo claro, usar o esmeralda escuro #0F766E. Geist, espaçamento de 4 px, raios 6/8/12 px. Ícones Lucide com rótulos acessíveis quando interativos.

## Componentes

Button, Input, Card, StatusBadge, PriorityBadge, MetricCard, EmptyState, Alert e Timeline estão na biblioteca compartilhada. A demonstração inclui navegação, filtros, tabela e métricas interativas. Os badges mostram texto além da cor. Controles têm foco visível e campos possuem rótulos. Button segue a implementação manual adaptada do padrão shadcn/ui com Radix Slot, CVA e cn. Os dois workspaces possuem components.json e tokens semânticos Tailwind v4. A CLI e seus componentes restantes ainda precisam ser validados; diálogos, paginação e skeletons ficam para a próxima entrega.

## Executar

Node.js 22+ e pnpm 10.4.1: `pnpm install`, depois `pnpm dev`. Abrir http://localhost:3000. Validação: `pnpm typecheck` e `pnpm build`. Sem dados reais.

## Checklist

- [x] Tokens e marca integrados.
- [x] Componentes iniciais e catálogo.
- [x] Instalação, build e captura visual em desktop/360 px (CI 45403856111).
- [ ] Componentes restantes e fluxos por papel.
- [ ] Aprovação do design definitivo.

## Validação de interface

- [x] Layout mobile com lista de chamados em vez de tabela estreita, controles de largura flexível e foco visível.
- [x] Skip link, cabeçalhos de tabela, contagem anunciável, contraste de borda e preferência por movimento reduzido.
- [x] Testes Playwright e axe configurados em desktop e 360 px; workflow de CI preparado.
- [x] Build, testes automatizados e linha de base axe no CI 45403856111.
- [ ] Verificação manual com leitor de tela, teclado e zoom 200%. Não alegar conformidade WCAG até validar.

Execute `pnpm build` antes dos testes. Execute `pnpm --filter @deskflow/web exec playwright install chromium` e `pnpm --filter @deskflow/web test:e2e`. Referências: https://ui.shadcn.com/docs/monorepo e https://playwright.dev/docs/accessibility-testing.

## Protótipo de login

A rota `/` apresenta o login demonstrativo e `/design-system` preserva o catálogo visual. O login usa somente credenciais fictícias, sem API, banco ou sessão real. A seleção de organização será implementada posteriormente. Testes de fluxo e acessibilidade foram adicionados; aguardar CI.

## Protótipo de fluxos P0

Seleção de organização e papel fictícios, portal do solicitante, atendimento, painel e administração foram implementados em memória para demonstração. Não constituem autenticação, autorização ou persistência reais; RF01–RF10, RF21 e RF22 dependem de implementação e validação no servidor. Testes de navegação e criação de chamados adicionados.

## Evidência visual

O CI gera capturas das interfaces principais em desktop e 360 px, verifica ausência de rolagem horizontal e publica o artefato `deskflow-interface-evidence`. As 30 capturas da execução [45403856111](https://github.com/sauloz20/deskflow/actions/runs/45403856111) foram inspecionadas visualmente com assistência de IA. Consulte o [relatório de revisão](visual-review.md). A aprovação humana definitiva e a validação interativa permanecem pendentes.
