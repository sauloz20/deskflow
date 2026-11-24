import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function capture(page: Page, name: string, path: string) {
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: path + '/' + name + '.png', fullPage: true, animations: 'disabled' });
}

async function enter(page: Page, role: string) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Preencher dados de demonstração' }).click();
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByLabel('Perfil de demonstração').selectOption(role);
}

test('visual evidence for main interface states', async ({ page }, info) => {
  const path = 'visual-evidence/' + info.project.name;
  await page.goto('/');
  await capture(page, '01-login', path);
  await page.goto('/design-system');
  await capture(page, '02-design-system', path);
  await enter(page, 'Solicitante');
  await capture(page, '03-organizacoes', path);
  await page.getByRole('button', { name: /Aurora Tecnologia/ }).click();
  await capture(page, '04-solicitante', path);
  await page.getByRole('button', { name: 'Novo chamado', exact: true }).last().click();
  await capture(page, '05-novo-chamado', path);
  await enter(page, 'Atendente');
  await page.getByRole('button', { name: /Aurora Tecnologia/ }).click();
  await capture(page, '06-atendente', path);
  await page.getByRole('button', { name: 'Chamados', exact: true }).click();
  await capture(page, '07-fila', path);
  if (await page.getByRole('button', { name: /Mostrar filtros/ }).isVisible()) {
    await page.getByRole('button', { name: /Mostrar filtros/ }).click();
    await capture(page, '07-fila-filtros', path);
  }
  await page.getByRole('button', { name: /Falha de acesso ao e-mail/ }).click();
  await capture(page, '08-detalhe', path);
  await enter(page, 'Gestor');
  await page.getByRole('button', { name: /Aurora Tecnologia/ }).click();
  await capture(page, '09-gestor', path);
  await enter(page, 'Administrador');
  await page.getByRole('button', { name: /Aurora Tecnologia/ }).click();
  await capture(page, '10-admin', path);
  await page.getByRole('button', { name: /Admin Demo.*Administrador/ }).click();
  await capture(page, '12-perfil', path);
  for (const view of ['Membros','Equipes','Categorias','Auditoria','Configurações']) {
    await page.getByRole('button', { name: view, exact: true }).click();
    await capture(page, '11-admin-' + view.toLowerCase(), path);
  }
});

test('workspace accessibility baseline', async ({ page }) => {
  await enter(page, 'Solicitante');
  await page.getByRole('button', { name: /Aurora Tecnologia/ }).click();
  const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
  expect(result.violations).toEqual([]);
});
