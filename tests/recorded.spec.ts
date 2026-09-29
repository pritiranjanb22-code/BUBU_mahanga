import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://gpdp.nic.in/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Enter your Phone Number' }).click();
  await page.getByRole('textbox', { name: 'Enter your Phone Number' }).fill('8249184554');
  await page.getByRole('textbox', { name: 'Enter your Password' }).click();
  await page.getByRole('textbox', { name: 'Enter your Password' }).fill('Mahanga@26');
  await page.getByRole('textbox', { name: 'Captcha Answer' }).click();
  await page.getByRole('textbox', { name: 'Captcha Answer' }).fill('1cil61');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: '    Frontline Worker' }).click();
  await page.getByLabel('Show 102550100 entries').selectOption('100');
  await page.locator('tr:nth-child(14) > td:nth-child(9) > a').click();
  await page.getByLabel('Show 102550100 entries').selectOption('100');
  await page.locator('tr:nth-child(15) > td:nth-child(9) > a').click();
});