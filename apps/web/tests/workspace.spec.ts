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
