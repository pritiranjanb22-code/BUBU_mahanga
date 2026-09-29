import { test, expect } from '@playwright/test';

test('deactivate all active users', async ({ page }) => {
  await page.goto('https://gpdp.nic.in/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Enter your Phone Number' }).fill('8249184554');
  await page.getByRole('textbox', { name: 'Enter your Password' }).fill('Mahanga@26');
  await page.getByRole('textbox', { name: 'Captcha Answer' }).fill('1cil61');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: ' Frontline Worker' }).click();
  await page.getByLabel('Show 102550100 entries').selectOption('100');

  let pageNum = 1;
  const totalPages = 14;

  while (pageNum <= totalPages) {
    console.log(`Processing page ${pageNum}...`);

    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const actionCell = row.locator('td:nth-child(9)');
      const activateLink = actionCell.locator('a').first();

      const linkText = await activateLink.textContent();
      const isActive = linkText?.trim().toLowerCase().includes('deactivate');

      if (isActive) {
        console.log(`Row ${i + 1}: User is active, clicking deactivate...`);
        await activateLink.click();

        await page.waitForLoadState('networkidle');
        await expect(page.locator('text=Deactivated successfully')).toBeVisible({ timeout: 5000 }).catch(() => {});
      } else {
        console.log(`Row ${i + 1}: User already deactivated, skipping.`);
      }
    }

    if (pageNum < totalPages) {
      const nextButton = page.locator('a.paginate_button.next:not(.disabled)');
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForLoadState('networkidle');
        pageNum++;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  console.log('All pages processed!');
});