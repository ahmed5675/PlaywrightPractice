process.env.PWDEBUG = 1;

// @ts-check
const { test, expect, selectors } = require('@playwright/test');



test('get SIGN IN Link', async ({ page }) => {

  await page.setDefaultTimeout(60000);
  const placeOrder = await page.locator(`button[type='button'][title='Place Order'].button.button--big.button--second.button--block.false`);
  await page.goto('https://paramount.visualr.dev/');


  await page.waitForLoadState();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Home/);

  // Click the SIGN IN Button link.
  await page.locator('//*[@id="header"]/div[1]/div/div/div[3]/a[2]').click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*login/);

  // Filling username and password.
  await page.locator('//*[@id="login"]/form/div[1]/div[1]/label/input').fill('3454');
  await page.locator('//*[@id="login"]/form/div[1]/div[2]/label/input').fill('Test123');



  //Click SubmitButton
  await page.locator('//*[@id="login"]/form/div[2]/div[1]/button').click();

  // Expects the URL to conatin wholesaler
  await page.waitForNavigation();
  await expect(page).toHaveURL(/wholesaler/);

  //Click on Shop By Category
  //page.getByRole('button', { name: 'shopping_bag Shop By Category' }).click();
  //await page.locator('#products-menu > div > div > ul > li.products-menu__item.products-menu__item--mega.products-menu__item--hover > button > span').click();


  //Click on Search and fill in product ID
  //page.getByPlaceholder('Search by Product Name or ID',{exact:true}).fill('11103');
  //page.locator('//*[@id="search-form"]/div/input').fill('11103');
  //page.getByTitle('Search',{exact:true}).click();

  await page.waitForLoadState('networkidle');

  // Adding Product ID in Search bar
  await page.getByPlaceholder('Search by Product Name or ID', { exact: true }).fill('11103');



  //await page.locator('//*[@id="search-form"]/div/div[1]/button').click();

  await page.keyboard.press('Enter');

  //await expect(page).toHaveURL(/search/);

  //await page.locator('.field field--filled field--qty'); 

  //await page.type('.field__input','5')


  // Putting the QTY as 5
  await page.locator('//*[@id="products-list-search-page"]/div/div[2]/div[1]/div[2]/div/div/div[1]/div/div[2]/div[1]/div[3]/div[2]/div/input').fill('5');
  //await page.locator('//*[@id="menu"]/div/ul[2]/li[3]/button').click();



  //await page.locator('menu__link').click();

  //await page.waitForSelector('.menu__link');
  //await page.click('.menu__link');
  //await page.waitForSelector('#cart-button');
  //await page.click('#cart-button');


  // Click on Cart Icon 
  await page.locator('//*[@id="menu"]/div/ul[2]/li[3]/button').first().click();

  // Wait for Page Load
  await page.waitForLoadState();

  //Click on Checkout Button
  const button = await page.waitForSelector('.button.button--second.button--block') && page.getByTitle('Checkout');

  await page.waitForLoadState();

  await button.click();

  //await page.waitForLoadState();

  //Adding the Value as 5675 in Reference PO
  await page.fill('.field__input[name="reference"]', '5675');

  // Adding the comments in Delivery Notes
  await page.fill('.field__input[name="notes"]', 'Automated Test Order');


  //await page.click('//*[@id="payment"]/div/div[2]/label[1]');

  await page.waitForLoadState();

  // Click Place Order
  await placeOrder.click({ force: true });

  //await page.locator(`#sticky button[type='button']`).click({force:true});
  await page.waitForNavigation();

  //Assertion for the Order Confirmation page 
  await expect(page).toHaveURL(/paramount.visualr.dev\/checkout\/confirmation.*/);


})

