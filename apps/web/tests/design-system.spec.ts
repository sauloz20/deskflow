import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('layout, keyboard navigation and ticket filters', async ({ page }) => {
  await page.goto('/design-system');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para conteúdo' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', { name: /Aberto.*Ver chamados/ }).click();
  await expect(page.getByRole('status')).toHaveText('1 chamado encontrado');
  await page.getByLabel('Buscar chamado').fill('não existe');
  await expect(page.getByRole('status')).toHaveText('0 chamados encontrados');
  await page.getByRole('button', { name: 'Limpar filtros' }).click();
  await expect(page.getByRole('status')).toHaveText('4 chamados encontrados');
});

test('automated accessibility baseline', async ({ page }) => {
  await page.goto('/design-system');
  const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
  expect(result.violations).toEqual([]);
});
