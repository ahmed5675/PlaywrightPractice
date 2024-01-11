// const XLSX = require('xlsx');

// function readExcelFile() {
//     const workbook = XLSX.readFile('/Users/macbook/Desktop/Playwright PAR/tests/Paramount Liquor 404 and Redirections (August 2022).xlsx');

// ;
//   const sheetName = workbook.SheetNames[0];
//   const worksheet = workbook.Sheets[sheetName];

//   const data = [];
//   for (let i = 2; i <= 1001; i++) { // Assuming data starts from row 2
//     const url = worksheet[`A${i}`]?.v; // Column A contains the URLs
//     const expectedRedirect = worksheet[`B${i}`]?.v; // Column B contains the expected redirections
//     if (url && expectedRedirect) {
//       data.push({ URL: url, 'Possible Redirection': expectedRedirect });
//     }
//   }

//   return data;
// }

// //process.env.PWDEBUG = 1;

// // @ts-check
// const { test, expect, selectors } = require('@playwright/test');



// test('get SIGN IN Link', async ({ page,browser }) => {

//   console.log('Executing the test');

//     const { chromium } = require('@playwright/test');

//     async function verifyRedirections() {
//       const data = await readExcelFile(); // Function to read the Excel file using a library like 'xlsx'

//       const browser = await chromium.launch({ headless: false });
//       const context = await browser.newContext();

//       for (const row of data) {
//         const url = row.URL;
//         const expectedRedirect = row['Possible Redirection'];

//         const page = await context.newPage();
//         await page.goto(url);

//         const currentUrl = page.url();
//         if (currentUrl !== expectedRedirect) {
//           console.log(`Redirection verification failed for ${url}. Expected: ${expectedRedirect}, Actual: ${currentUrl}`);
//         }

//         await page.close();
//       }

//       await browser.close();
//     }

//     await verifyRedirections();


// })

const XLSX = require('xlsx');

function readExcelFile() {
  const workbook = XLSX.readFile('/Users/macbook/Desktop/Playwright PAR/tests/Paramount Liquor 404 and Redirections (August 2022).xlsx');
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const data = [];
  for (let i = 2; i <= 1001; i++) { // Assuming data starts from row 2
    const url = worksheet[`A${i}`]?.v; // Column A contains the URLs
    const expectedRedirect = worksheet[`B${i}`]?.v; // Column B contains the expected redirections
    if (url && expectedRedirect) {
      data.push({ URL: url, 'Possible Redirection': expectedRedirect });
    }
  }

  return { workbook, worksheet, data };
}

//process.env.PWDEBUG = 1;

// @ts-check
const { test, expect, selectors } = require('@playwright/test');

test('URL Redirection PAR-4597', async ({ page, browser }) => {
  console.log('Executing the test');

  const { chromium } = require('@playwright/test');

  async function verifyRedirections() {
    const { workbook, worksheet, data } = await readExcelFile(); // Function to read the Excel file using a library like 'xlsx'

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();

    const resultColumn = 'C';
    const resultColumnHeader = 'Result';

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const url = row.URL;
      const expectedRedirect = row['Possible Redirection'];

      const page = await context.newPage();
      await page.goto(url);

      const currentUrl = page.url();
      const isRedirected = currentUrl === expectedRedirect;
      if (isRedirected) {
        console.log(`Redirection verified for ${url}.`);
      } else {
        console.log(`Redirection verification failed for ${url}. Expected: ${expectedRedirect}, Actual: ${currentUrl}`);
      }

      // Write the result to the Excel file
      const cell = `${resultColumn}${i + 2}`; // Assuming data starts from row 2
      worksheet[cell] = { t: 's', v: isRedirected ? 'true' : 'false' };
      if (i === 0) { // Write the header for the new column
        worksheet[`${resultColumn}1`] = { t: 's', v: resultColumnHeader };
      }

      await page.close();
    }

    await browser.close();

    // Write the modified Excel file
    XLSX.writeFile(workbook, '/Users/macbook/Desktop/Playwright PAR/tests/Paramount Liquor 404 and Redirections (August 2022).xlsx');
  }

  await verifyRedirections();
});
