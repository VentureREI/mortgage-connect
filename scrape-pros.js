const { chromium } = require('playwright');

async function scrapeProsForm() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log('📍 Navigating to Arizona Home Loan Pros site...\n');
    await page.goto('https://arizonahomeloanpros.com/form?type=buyer', { waitUntil: 'networkidle' });

    // Wait longer for form to load
    await page.waitForTimeout(5000);

    console.log('🔍 Extracting all form content...\n');

    // Extract comprehensive form data
    const formData = await page.evaluate(() => {
      const data = {
        steps: [],
        allText: []
      };
      
      // Get all form sections/steps
      const sections = document.querySelectorAll('[class*="step"], [class*="section"], .form-group, [role="group"]');
      
      sections.forEach((section, idx) => {
        const sectionText = section.textContent.trim();
        if (sectionText && sectionText.length > 5) {
          data.steps.push({
            step: idx + 1,
            content: sectionText.substring(0, 300)
          });
        }
      });

      // Get all visible text content
      const bodyText = document.body.innerText;
      const lines = bodyText.split('\n').filter(line => line.trim().length > 0 && line.trim().length < 200);
      data.allText = lines.slice(0, 50);

      return data;
    });

    console.log('FORM STRUCTURE:');
    console.log(JSON.stringify(formData, null, 2));
    
    // Also capture the page content
    const content = await page.content();
    console.log('\n\n--- PAGE CONTAINS ---');
    const text = await page.evaluate(() => document.body.innerText);
    console.log(text.substring(0, 2000));

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

scrapeProsForm();
