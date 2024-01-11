
// @ts-check
const { test, expect, selectors } = require('@playwright/test');
const { chromium } = require('playwright');
const { LoginWholesaler, LogoutWholesaler } = require('./ProductSearchAPI.spec.js');


test('Product Search Wholesaler with Locators', async ({ page }) => {
    

    const ShopByCategory=page.getByRole('button', { name: 'shopping_bag Shop By Category' });
    const BeerCategory= page.getByRole('link', { name: 'Beer', exact: true });
    const SearchField = page.locator('.form-control');
    const ProdCard1=page.locator('.product-grid__title');
    const CasesQTY=page.locator('#product-form').getByRole('textbox');
    const CartButton=page.locator('button.menu__link[data-toggle-cart][title="Cart"]');
    const CheckOutButton=page.locator('button.button.button--second.button--block.false[title="Checkout"]');
    const ReferenceField=page.locator('input[name="reference"]');
    const PlaceOrderButton=page.locator(`button[type='button'][title='Place Order'].button.button--big.button--second.button--block.false`);
    const ClearCartButton=page.getByRole('button', { name: 'Clear Cart' });
    const ConfirmClearCartButton=page.locator(`button[title='Confirm'].button--second`);
    await LoginWholesaler(page, '5675', 'Temp/123');

    // await CartButton.first().click();
    // await ClearCartButton.isEnabled();
    // await ClearCartButton.click();
    // await ConfirmClearCartButton.isEnabled();
    // await ConfirmClearCartButton.click();
    // await page.click('#backdrop');


    await ShopByCategory.hover();
    await page.waitForLoadState();
    await BeerCategory.click();
    await expect(page).toHaveURL(/.*beer/);
    //await page.waitForNavigation({waitUntil:'networkidle'});
    await page.waitForSelector('.product-grid__title');
    const productTitles = await page.$$('.product-grid__title');
    console.log(productTitles.length,'Length');
    const randomIndex = Math.floor(Math.random() * productTitles.length);
    const productToClick = productTitles[randomIndex];
    await productToClick.click();
    //await page.waitForLoadState();
    await page.waitForLoadState();
    await CasesQTY.type('5');
    await page.waitForLoadState('networkidle');
    await CartButton.first().click();
    //await page.waitForLoadState();
    await CheckOutButton.click();
    await ReferenceField.fill('Ahmad Test Order');
    await page.waitForSelector('PlaceOrderButton');
    await PlaceOrderButton.click();
  
  });