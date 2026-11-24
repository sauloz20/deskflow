# Revisão visual do protótipo — 24/11/2026

## Evidências

- Commit: `52c1b5c0050de38bf62e53c0415ddd0a74cfa1f8`.
- [Execução de CI e artefato](https://github.com/sauloz20/deskflow/actions/runs/45403856111).
- 30 capturas estáticas: 15 telas em desktop (1280 px) e 15 em mobile (360 px).
- Inspeção visual assistida por IA, não substitui teste de usabilidade com pessoas.

| Tela | Desktop | Mobile |
| --- | --- | --- |
| Login | Sem bloqueio visual observado | Sem bloqueio visual observado |
| Design System | Consistente | Indicadores empilhados |
| Organizações | Sem bloqueio visual observado | Sem bloqueio visual observado |
| Solicitante | Consistente | Indicadores empilhados |
| Novo chamado | Formulário legível | Formulário adaptado |
| Atendente | Consistente | Indicadores empilhados |
| Fila | Filtros e lista visíveis | Filtros ocupam grande altura |
| Detalhe | Duas colunas | Colunas empilhadas |
| Gestor | Consistente | Indicadores empilhados |
| Administrador | Consistente | Menu extenso e indicadores empilhados |
| Auditoria | Consistente | Menu extenso |
| Categorias | Consistente | Menu extenso |
| Configurações | Consistente | Menu extenso |
| Equipes | Consistente | Menu extenso |
| Membros | Consistente | Menu extenso |

## Melhorias priorizadas

1. Média: compactar navegação administrativa mobile (menu recolhível, mantendo acesso por teclado).
2. Média: testar grade de dois indicadores por linha no mobile, sem truncar nomes longos.
3. Média: testar filtros recolhíveis na fila mobile, preservando indicação de filtros ativos.
4. Baixa: uniformizar ícone da marca entre login, catálogo e workspace.

Nenhum bloqueio visual evidente nas capturas estáticas. A ausência de rolagem horizontal foi verificada pelo teste de captura. As cores, hierarquia, rótulos e padrões de componentes mostram consistência geral; não foi realizado teste manual de contraste de cada estado.

## Checklist

- [x] Capturas de 15 telas em dois tamanhos.
- [x] Inspeção das 30 capturas.
- [x] Registro de melhorias.
- [ ] Ajustes de densidade mobile e novas capturas.
- [ ] Testes manuais de teclado, leitor de tela, zoom 200% e dispositivos intermediários.
- [ ] Aprovação humana definitiva.

Os dados e permissões exibidos são demonstrativos. Esta revisão não valida autenticação, API, banco de dados ou conformidade WCAG integral.
