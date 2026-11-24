import { test, expect } from '@playwright/test';

test('demonstration requester creates and opens a ticket', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', {name:'Preencher dados de demonstração'}).click();
  await page.getByRole('button', {name:'Entrar'}).click();
  await page.getByRole('button', {name:/Aurora Tecnologia/}).click();
  await expect(page.getByRole('heading', {name:'Olá, Marina.'})).toBeVisible();
  await page.getByRole('button', {name:'Novo chamado', exact:true}).last().click();
  await page.getByLabel('Título *').fill('Teste de atendimento');
  await page.getByLabel('Descrição *').fill('Descrição fictícia.');
  await page.getByLabel('Categoria *').selectOption('Acessos');
  await page.getByRole('button', {name:'Abrir chamado'}).click();
  await expect(page.getByRole('heading', {name:'Teste de atendimento'})).toBeVisible();
  await page.getByLabel('Mensagem').fill('Mensagem de teste.');
  await page.getByRole('button', {name:'Enviar mensagem'}).click();
  await expect(page.getByText('Mensagem: Mensagem de teste.')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('administrator can manage categories and switch organizations', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', {name:'Preencher dados de demonstração'}).click();
  await page.getByRole('button', {name:'Entrar'}).click();
  await page.getByLabel('Perfil de demonstração').selectOption('Administrador');
  await page.getByRole('button', {name:/Aurora Tecnologia/}).click();
  await page.getByRole('button', {name:'Categorias', exact:true}).click();
  await page.getByLabel('Nome da categoria').fill('Rede');
  await page.getByRole('button', {name:'Adicionar categoria'}).click();
  await expect(page.getByText('Rede', {exact:true})).toBeVisible();
  await page.getByRole('button', {name:'Aurora Tecnologia', exact:true}).click();
  await page.getByRole('button', {name:/Nexo Serviços/}).click();
  await page.getByRole('button', {name:'Categorias', exact:true}).click();
  await expect(page.getByText('Rede', {exact:true})).toHaveCount(0);
});

test('dashboard indicators lead to matching queues and profile is accessible', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Preencher dados de demonstração' }).click();
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('button', { name: /Aurora Tecnologia/ }).click();
  await page.getByRole('button', { name: /Aberto.*Ver chamados/ }).click();
  await expect(page.getByText('1 resultado(s)', { exact: true })).toBeVisible();
  if (await page.getByRole('button', { name: /Mostrar filtros/ }).isVisible()) {
    await page.getByRole('button', { name: /Mostrar filtros/ }).click();
  }
  await expect(page.getByLabel('Status', { exact: true })).toHaveValue('Aberto');
  await page.getByRole('button', { name: /Marina Alves.*Solicitante/ }).click();
  await expect(page.getByRole('heading', { name: 'Meu perfil' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('dashboard and ticket queue retain the selected date interval', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Preencher dados de demonstração' }).click();
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByLabel('Perfil de demonstração').selectOption('Gestor');
  await page.getByRole('button', { name: /Aurora Tecnologia/ }).click();
  await page.getByLabel('Período: de').fill('2026-11-24');
  await page.getByLabel('Até', { exact: true }).fill('2026-11-24');
  await page.getByRole('button', { name: /Criados no período/ }).click();
  await expect(page.getByText('2 resultado(s)', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Painel', exact: true }).click();
  await page.getByRole('button', { name: /Resolvidos no período/ }).click();
  await expect(page.getByText('1 resultado(s)', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /Atualização de software/ })).toBeVisible();
});

test('ticket queue adapts to viewport and opens a ticket by keyboard', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Preencher dados de demonstração' }).click();
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByLabel('Perfil de demonstração').selectOption('Atendente');
  await page.getByRole('button', { name: /Aurora Tecnologia/ }).click();
  await page.getByRole('button', { name: 'Chamados', exact: true }).click();
  if ((page.viewportSize()?.width ?? 0) >= 1150) {
    await expect(page.getByRole('table', { name: 'Chamados encontrados' })).toBeVisible();
  } else {
    await expect(page.locator('.df-product-list')).toBeVisible();
  }
  const ticket = page.getByRole('button', { name: /Falha de acesso ao e-mail/ });
  await ticket.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Falha de acesso ao e-mail' })).toBeVisible();
  await expect(page.getByLabel(/Nota interna/)).toBeVisible();
});
