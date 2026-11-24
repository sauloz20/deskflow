import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('login demonstration and password visibility', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Bem-vindo de volta.' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByLabel('E-mail').fill('wrong@example.com');
  await page.getByLabel('Senha', { exact: true }).fill('wrong');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page.locator('#login-error')).toContainText('dados fictícios');
  await page.getByRole('button', { name: 'Preencher dados de demonstração' }).click();
  await page.getByRole('button', { name: 'Mostrar senha' }).click();
  await expect(page.getByLabel('Senha', { exact: true })).toHaveAttribute('type', 'text');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page.getByRole('heading', { name: 'Bem-vindo ao DeskFlow.' })).toBeVisible();
  await page.getByRole('button', { name: 'Voltar ao login' }).click();
  await expect(page.getByRole('heading', { name: 'Bem-vindo de volta.' })).toBeVisible();
});

test('login automated accessibility baseline', async ({ page }) => {
  await page.goto('/');
  const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
  expect(result.violations).toEqual([]);
});
