const { chromium } = require('playwright');

async function scrapeHelpSite() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log('📍 Navigating to Arizona Home Loan Help site...\n');
    await page.goto('https://arizonahomeloanhelp.com/', { waitUntil: 'networkidle' });

    // Wait for the page to load
    await page.waitForTimeout(2000);

    console.log('🔍 Analyzing "Buy a Home" form...\n');

    // Click "I want to buy a home"
    const buyButton = await page.locator('button, [role="button"]').filter({ hasText: /buy|home/ }).first();
    await buyButton.click();
    await page.waitForTimeout(1500);

    // Extract form fields for buy path
    const buyFields = await extractFormFields(page);
    console.log('BUY FORM FIELDS:');
    console.log(JSON.stringify(buyFields, null, 2));

    // Go back to initial state
    const backButton = await page.locator('button').filter({ hasText: /back|home|close/i }).first();
    if (await backButton.isVisible()) {
      await backButton.click();
      await page.waitForTimeout(1500);
    } else {
      await page.goBack();
      await page.waitForTimeout(1500);
    }

    console.log('\n\n🔍 Analyzing "Finance a Home" form...\n');

    // Click "I want to finance my home"
    const financeButton = await page.locator('button, [role="button"]').filter({ hasText: /finance|refinance/ }).first();
    await financeButton.click();
    await page.waitForTimeout(1500);

    // Extract form fields for finance path
    const financeFields = await extractFormFields(page);
    console.log('FINANCE FORM FIELDS:');
    console.log(JSON.stringify(financeFields, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

async function extractFormFields(page) {
  const fields = [];
  let stepNumber = 1;

  // Get all form steps/sections
  const steps = await page.locator('[class*="step"], [class*="section"], form, .form-group').all();

  for (const step of steps) {
    const stepText = await step.textContent();
    if (stepText && stepText.trim().length > 0) {
      console.log(`\n--- Step ${stepNumber} ---`);
      console.log(stepText);
      stepNumber++;

      // Extract input fields
      const inputs = await step.locator('input, textarea, select').all();
      for (const input of inputs) {
        const type = await input.getAttribute('type');
        const name = await input.getAttribute('name');
        const placeholder = await input.getAttribute('placeholder');
        const label = await input.locator('..').locator('label').first().textContent();

        fields.push({
          type: type || 'text',
          name,
          placeholder,
          label
        });
      }
    }
  }

  return fields;
}

scrapeHelpSite();
