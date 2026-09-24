import { test, expect } from '@playwright/test';

test('has title and basic structure', async ({ page }) => {
  await page.goto('/');

  // Revisa que la página principal cargue y contenga elementos clave
  await expect(page).toHaveTitle(/Infocod/i); // Cambia esto si el título de tu metadata es diferente
  
  // Verifica que el Hero Section esté presente
  const heroTitle = page.locator('.hero-text-3d');
  await expect(heroTitle).toBeVisible();
});
