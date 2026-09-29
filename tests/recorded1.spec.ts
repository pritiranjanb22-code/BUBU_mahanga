import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://gpdp.nic.in/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Enter your Phone Number' }).click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByRole('textbox', { name: 'Enter your Phone Number' }).fill('8249184554');
  await page.getByRole('textbox', { name: 'Enter your Password' }).click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByRole('textbox', { name: 'Enter your Password' }).fill('Mahanga@26');
  await page.getByRole('textbox', { name: 'Captcha Answer' }).click();
  await page.getByRole('textbox', { name: 'Captcha Answer' }).fill('17blna');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: '    Frontline Worker' }).click();
  await page.getByLabel('Show 102550100 entries').selectOption('100');
  await page.getByRole('link', { name: '10' }).click();
  await page.getByRole('link', { name: '8' }).click();
  await page.getByRole('link', { name: '7' }).click();
  await page.getByRole('link', { name: 'Previous' }).click();
  await page.getByRole('link', { name: 'Previous' }).click();
  await page.getByRole('link', { name: 'Previous' }).click();
  await page.getByRole('link', { name: '3', exact: true }).click();
  await page.getByRole('link', { name: '2', exact: true }).click();
  await page.locator('tr:nth-child(58) > td:nth-child(9) > a').click();
  await page.getByRole('link', { name: '3' }).click({
    modifiers: ['Alt']
  });
  await page.getByRole('link', { name: '5' }).click();
  await page.getByRole('link', { name: '6' }).click();
  await page.getByRole('link', { name: '7' }).click();
  await page.getByRole('link', { name: '8' }).click();
  await page.getByLabel('Show 102550100 entries').selectOption('100');
  await page.getByRole('link', { name: '3', exact: true }).click();
  await page.locator('td:nth-child(9) > a').first().click();
  await page.getByLabel('Show 102550100 entries').selectOption('100');
  await page.getByRole('link', { name: '    Frontline Worker' }).click();
  await page.getByText('Showing 1 to 10 of 909 entries').click();
  await page.getByText('Create FrontLine Worker Show').click();
  await page.getByText('Please wait... OdishaMahanga').press('ControlOrMeta+c');
});