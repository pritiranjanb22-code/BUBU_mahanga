import { test, expect } from '@playwright/test';

test('deactivate all active users from page 19 onwards', async ({ page }) => {
  await page.goto('https://gpdp.nic.in/');
  
  await page.getByRole('link', { name: 'Login' }).click();
  await page.waitForTimeout(2000);
  
  await page.locator('input[name="phoneNumber"], input[placeholder*="Phone"], input[id*="phone"]').first().fill('+919999999999');
  await page.locator('input[name="password"], input[placeholder*="Password"], input[id*="password"]').first().fill('Test@123');
  await page.locator('input[name="captcha"], input[placeholder*="Captcha"], input[id*="captcha"]').first().fill('1cil61');
  await page.pause();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(5000);
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 });

  await page.getByRole('link', { name: ' Frontline Worker' }).click();
  await page.waitForTimeout(3000);
  await page.getByLabel('Show 102550100 entries').selectOption('10');
  await page.waitForTimeout(2000);

  let totalDeactivated = 0;
  let totalSkipped = 0;
  let currentPage = 19;
  const TOTAL_PAGES = 88;

  while (currentPage <= TOTAL_PAGES) {
    console.log(`\n========== PROCESSING PAGE ${currentPage} ==========`);
    
    // Navigate to target page
    await navigateToPage(page, currentPage);
    
    // Get row count on this page
    await page.waitForSelector('tbody tr', { timeout: 10000 });
    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();
    console.log(`Page ${currentPage}: Found ${rowCount} rows`);

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      console.log(`\n--- Page ${currentPage}, Row ${rowIndex + 1} ---`);
      
      // Navigate to page before each action (page resets after each click)
      await navigateToPage(page, currentPage);
      await page.waitForSelector('tbody tr', { timeout: 10000 });
      
      const rows = page.locator('tbody tr');
      const row = rows.nth(rowIndex);
      const actionCell = row.locator('td:nth-child(9)');
      const actionLink = actionCell.locator('a').first();

      const href = await actionLink.getAttribute('href');
      const iconTitle = await actionLink.locator('i').getAttribute('title');
      
      const isActive = href?.includes('purpose=activate') || iconTitle?.toLowerCase().includes('activate');

      if (isActive) {
        console.log(`User is ACTIVE (green check), clicking to deactivate...`);
        await actionLink.click();
        
        // Wait for page reload
        await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
        await page.waitForSelector('tbody tr', { timeout: 10000 });
        
        console.log(`Deactivated successfully`);
        totalDeactivated++;
      } else {
        console.log(`User already deactivated (red X), skipping.`);
        totalSkipped++;
      }
    }

    currentPage++;
  }

  console.log('\n========== FINAL SUMMARY ==========');
  console.log(`Total pages processed: ${TOTAL_PAGES - 18} (pages 19-${TOTAL_PAGES})`);
  console.log(`Users deactivated: ${totalDeactivated}`);
  console.log(`Users already deactivated (skipped): ${totalSkipped}`);
  console.log('====================================');
  
  await page.pause();
});

async function navigateToPage(page: any, targetPage: number) {
  // If already on target page, check
  const activePage = page.locator('.paginate_button.page-item.active a.page-link');
  if (await activePage.isVisible({ timeout: 2000 })) {
    const currentPageNum = await activePage.textContent();
    if (currentPageNum?.trim() === String(targetPage)) {
      console.log(`Already on page ${targetPage}`);
      return;
    }
  }

  // Navigate by clicking Next until we reach target
  for (let p = 1; p < targetPage; p++) {
    const nextButton = page.locator('#DataTables_Table_0_next a.page-link');
    if (await nextButton.isVisible({ timeout: 3000 })) {
      const isDisabled = await nextButton.evaluate(el => el.closest('li')?.classList.contains('disabled'));
      if (!isDisabled) {
        await nextButton.click();
        await page.waitForSelector('tbody tr', { timeout: 10000 });
      } else {
        break;
      }
    } else {
      break;
    }
  }
  
  // Verify we're on the right page
  const verifyPage = page.locator('.paginate_button.page-item.active a.page-link');
  const pageNum = await verifyPage.textContent();
  console.log(`Navigated to page: ${pageNum?.trim()}`);
}