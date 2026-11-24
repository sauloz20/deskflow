# Front-end do produto — entrega 01

Base: requisitos v1.1, seções 3, 5, 6, 7, 11 e 12.

## Implementação

- Login aprovado preservado (RF01). O catálogo de design permanece em /design-system.
- Workspace responsivo, indicadores compactos, filtros recolhíveis no mobile, marca original e perfil (RNF04).
- Painéis de solicitante, atendente, gestor e administrador com informações e ações específicas (RF09/RF21).
- Modelo fictício separado do componente principal. A demonstração continua em memória e não é uma implementação de autorização.
- Transporte REST em apps/web/app/workspace/api-client.ts com caminhos previstos na seção 6, tratamento de 401/403, cancelamento e decodificação explícita. Configuração: NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1. Não inserir segredos nessa variável.

## Integração pendente

A API possui apenas health funcional. Não ligar o login de demonstração ao transporte. Quando os endpoints existirem, obter sessão, papéis e organizações do servidor; substituir o armazenamento demo por consultas e mutações; definir DTOs e decodificadores a partir do OpenAPI; definir proteção CSRF e política de cookies/CORS antes de ativar sessão; implementar estados de carregamento, erro e recuperação sem perder formulário. Nunca confiar no papel selecionado no cliente.

| Requisito | Estado |
| --- | --- |
| RF01–RF08 | Fluxos demonstrativos; aceite depende da API |
| RF09 | Painéis e distribuição visual; períodos e métricas reais pendentes |
| RF10 | Histórico demonstrativo; auditoria persistente pendente |
| RF21 | Indicadores de status abrem fila filtrada; período e paridade real pendentes |
| RF22 | Linha do tempo demonstrativa; visibilidade e ordenação no servidor pendentes |

## Referências de engenharia

Aplicar os princípios já registrados no README: clareza (Gustavo Guanabara), consistência visual (Rafaella Ballerini), separação por domínio (Loiane Groner), decisões arquiteturais explícitas (Fabio Akita), documentação e componentes reutilizáveis (Zeno Rocha), React e testes (Mario Souto), critérios de aceite e qualidade (Guilherme Silveira). Estas são diretrizes de estudo, não atribuição de código específico. Nenhum código proprietário foi copiado.

## Checklist

- [x] Preservar identidade e login.
- [x] Primeira evolução dos dashboards e responsividade.
- [x] Adicionar perfil.
- [x] Separar modelo demo e preparar transporte REST.
- [ ] Executar CI e inspecionar novas capturas.
- [ ] Implementar os demais componentes, estados assíncronos e métricas por período.
- [ ] Integrar API e verificar todos os critérios P0.
- [ ] Aprovação visual humana e acessibilidade manual.

P1 e P2 permanecem no backlog conforme o PDF.

## Entrega 02 — indicadores e rastreabilidade

- Dashboard e fila compartilham intervalo de datas, considerando o fuso America/Sao_Paulo.
- Criações são contadas pela data de criação; resoluções contam chamados distintos com evento de resolução no intervalo. O indicador abre a lista correspondente, inclusive chamados reabertos.
- Histórico é ordenado por timestamp e alterações de prioridade/responsável registram valor anterior e novo.
- Novo teste Playwright cobre a correspondência entre indicadores e filas. Novas capturas incluem perfil e filtros expandidos no mobile.
- A API tem serviço de prontidão do banco; a pipeline aplica o esquema em PostgreSQL descartável e executa um teste de persistência transacional de chamados, comentários e auditoria. Não é a integração das telas com a API.

A aprovação desta entrega depende da execução do CI e revisão das novas capturas. Autenticação, endpoints de negócio, permissões, migrações versionadas e integração continuam pendentes.

## Entrega 03 — refinamento visual do workspace

- Cabeçalho de dashboard com identificação do papel, ação principal e identidade visual existente.
- Indicadores com ícones, contraste semântico e hierarquia numérica; distribuição por status para gestão e administração, com valores textuais e sem depender apenas da cor.
- Fila em tabela semântica no desktop amplo e cartões em telas menores, mantendo pesquisa, filtros, paginação e abertura de detalhes.
- Navegação lateral com ícones específicos e estado ativo; descrição e conversa com quebra de textos longos e destaque para notas internas.
- Novo teste de adaptação de layout e abertura de chamado por teclado.

A revisão visual e a aprovação do pipeline desta entrega permanecem pendentes. Dados demonstrativos e backend continuam separados.
