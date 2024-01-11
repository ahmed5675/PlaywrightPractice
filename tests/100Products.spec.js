
// @ts-check
const { test, expect, selectors } = require('@playwright/test');
const { chromium } = require('playwright');
const { LoginWholesaler, LogoutWholesaler } = require('./ProductSearchAPI.spec.js');
let webContext;



test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://paramount.visualr.dev');
    await page.locator('//*[@id="header"]/div[1]/div/div/div[3]/a[2]').click();
    await page.locator('//*[@id="login"]/form/div[1]/div[1]/label/input').fill('6766');
    await page.locator('//*[@id="login"]/form/div[1]/div[2]/label/input').fill('Temp/123');
    await page.locator('//*[@id="login"]/form/div[2]/div[1]/button').click();
    //await page.pause();
    //await page.goto('https://paramount.visualr.dev/beer/');   
    await page.waitForLoadState('networkidle');

    await context.storageState({path:'state.json'})
    webContext=await browser.newContext({storageState:'state.json'});
  
});

test('100 Products', async ({}) => {
    
    const page= await webContext.newPage()

 await page.goto('https://paramount.visualr.dev/beer/')   
    
    const SearchField = page.locator('.form-control');
    const ProdCard1=page.locator('.product-grid__title');
    const CasesQTY=page.locator('#product-form').getByRole('textbox');
    const CartButton=page.locator('button.menu__link[data-toggle-cart][title="Cart"]');
    const CheckOutButton=page.locator('button.button.button--second.button--block.false[title="Checkout"]');
    const ReferenceField=page.locator('input[name="reference"]');
    const PlaceOrderButton=page.locator(`button[type='button'][title='Place Order'].button.button--big.button--second.button--block.false`);
    const ClearCartButton=page.getByRole('button', { name: 'Clear Cart' });
    const ConfirmClearCartButton=page.locator(`button[title='Confirm'].button--second`);
    //await LoginWholesaler(page, '6766', 'Temp/123');

    // await CartButton.first().click();
    // await ClearCartButton.isEnabled();
    // await ClearCartButton.click();
    // await ConfirmClearCartButton.isEnabled();
    // await ConfirmClearCartButton.click();
    // await page.click('#backdrop');


    
    await page.waitForLoadState();
    await expect(page).toHaveURL(/.*beer/);
    await page.waitForSelector('.product-grid__title');
    

var productTitles = await page.$$('.product-grid__title');
const productCount = Math.min(productTitles.length, 100);

for (let i = 0; i < productCount; i++) {
    await productTitles[i].click();
    await page.waitForLoadState();

    // Locate and retrieve the 'Stock On Hand' value
    const stockOnHandElement = await page.locator('.product-extra-info:has-text("Stock On Hand") .product-extra-info__text');
    const stockOnHandText = await stockOnHandElement.textContent() || "0";
    const stockOnHand = parseInt(stockOnHandText, 10);

    // Check if 'Stock On Hand' is greater than 0
    if (stockOnHand > 0) {
        await CasesQTY.first().fill('5');
        await page.waitForLoadState('networkidle');
        await CartButton.first().click();
    }

    // Navigate back to the product list
    await page.goBack();
    await page.waitForLoadState();

    // Re-fetch product titles if necessary
    if (i < productCount - 1) {
        await page.waitForSelector('.product-grid__title');
        productTitles = await page.$$('.product-grid__title');
    }
}


    
    // Proceed to checkout after adding products
    await CheckOutButton.click();
    await ReferenceField.fill('Ahmad Test Order');
    await page.waitForSelector('PlaceOrderButton');
    await PlaceOrderButton.click();
  });