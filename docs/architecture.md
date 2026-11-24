# Arquitetura — fundação do back-end

Conforme requisitos v1.1, o monorepo contém Next.js (apps/web), NestJS (apps/api), biblioteca visual (packages/ui) e documentação. A API é um monólito modular com prefixo /api/v1 e Swagger em /docs. Nesta entrega, apenas GET /api/v1/health é funcional; os endpoints de negócio ainda não existem.

## Modelo de dados

O esquema Prisma usa PostgreSQL e inclui organizações, membros, equipes, categorias, chamados, comentários e auditoria. Referências compostas por organização evitam referências cruzadas na modelagem, mas não substituem autorização no servidor. Protocolo é único por organização. A política de acesso e as transações serão implementadas nos módulos de domínio. O esquema não foi aplicado a um banco real.

## Desenvolvimento

1. Instalar dependências com pnpm install.
2. Para usar o banco local, definir POSTGRES_PASSWORD no ambiente e executar docker compose up -d.
3. Copiar apps/api/.env.example para apps/api/.env e trocar a senha local.
4. Validar com pnpm --filter @deskflow/api schema:validate. As migrações versionadas e o seed ainda precisam ser preparados antes da integração.
5. Rodar pnpm --filter @deskflow/api dev; abrir http://localhost:3001/api/v1/health e http://localhost:3001/docs.

Não publicar arquivos .env. A interface ainda usa dados fictícios em memória.
