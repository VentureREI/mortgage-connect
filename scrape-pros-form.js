const { chromium } = require('playwright');

async function scrapeProsForm() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const allQuestions = [];

  try {
    console.log('📍 Navigating to Arizona Home Loan Pros site...\n');
    await page.goto('https://arizonahomeloanpros.com/form?type=buyer', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // Collect all questions by scrolling through the form
    for (let i = 0; i < 15; i++) {
      const currentQuestion = await page.evaluate(() => {
        return document.body.innerText.split('\n').filter(line => line.trim().length > 5 && line.trim().length < 100);
      });

      // Get unique lines not in allQuestions
      currentQuestion.forEach(q => {
        if (!allQuestions.includes(q) && q.length > 3) {
          allQuestions.push(q);
        }
      });

      // Try to click next button or submit
      const buttons = await page.$$('button');
      let clicked = false;

      for (const btn of buttons) {
        const text = await btn.textContent();
        if (text.includes('Next') || text.includes('Continue') || text.includes('next')) {
          await btn.click();
          await page.waitForTimeout(1000);
          clicked = true;
          break;
        }
      }

      if (!clicked) break;
    }

    console.log('ALL FORM QUESTIONS/FIELDS EXTRACTED:');
    const uniqueQuestions = allQuestions.filter((q, i) => allQuestions.indexOf(q) === i);
    uniqueQuestions.forEach((q, idx) => {
      if (!q.includes('Policy') && !q.includes('Accessibility') && !q.includes('NMLS')) {
        console.log((idx + 1) + '. ' + q);
      }
    });

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

scrapeProsForm();
