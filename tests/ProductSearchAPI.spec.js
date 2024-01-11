// @ts-check
const { test, expect, selectors } = require('@playwright/test');
const { chromium } = require('playwright');

// let cookiesList=[];

async function LoginWholesaler(page, username, password) {
  const SignInButton = page.locator('//*[@id="header"]/div[1]/div/div/div[3]/a[2]');
  const UserName = page.locator('//*[@id="login"]/form/div[1]/div[1]/label/input');
  const PassWord = page.locator('//*[@id="login"]/form/div[1]/div[2]/label/input');
  const SubmitButton = page.locator('//*[@id="login"]/form/div[2]/div[1]/button');

  await page.goto('https://paramount.visualr.dev');
  //await page.waitForLoadState();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Home | Paramount Liquor/);

  // Click the SIGN IN Button link.
  SignInButton.click();

  await UserName.fill(username);
  await PassWord.fill(password);
  await SubmitButton.click();

  await page.waitForLoadState();

 
  // Expects the URL to contain wholesaler.
  await expect(page).toHaveURL(/.*wholesaler/);

  await page.waitForLoadState();


  //   //wait for username and password to be filled
  //   await page.waitForSelector('//*[@id="login"]/form/div[1]/div[1]/label/input');
  //   await page.waitForSelector('//*[@id="login"]/form/div[1]/div[2]/label/input');
}


async function LogoutWholesaler(page) {
  await page.waitForLoadState('networkidle');

  const AccountLink = page.locator('a[href="/wholesaler/"].menu__link[title="Account"]');
  const LogOut = page.locator('a.submenu__link[title="Logout"]');
  const SignInButton = page.locator('//*[@id="header"]/div[1]/div/div/div[3]/a[2]');

  await AccountLink.first().hover();
  await LogOut.first().click();

  await expect(page).toHaveURL('https://paramount.visualr.dev/');
  // Click the SIGN IN Button link.
  SignInButton.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*login/);

}

// async function makeGraphqlApiCall(endpointPostFix, query) {

//   // const browser = await chromium.launch();
//   // const context = await browser.newContext();
//   // const page = await context.newPage();
//   //await page.goto(endpointUrl);
//   try { 
//   const response = await fetch(`https://paramount.visualr.dev/graphql-${endpointPostFix}`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json',
//   'set-cookie':'PHPSESSID_2=' + cookiesList['PHPSESSID_2'] + ';PHPSESSID=' + cookiesList['PHPSESSID'],
//   domain: 'paramount.visualr.dev'},
//     body: JSON.stringify({ query }),
//   });
//   console.log(' API Respone ',response);

//   } catch(err) {
//     console.log('API Eroor 2',err)

//   }
// }
async function SearchResultQuery (){
// Usage example
const endpointPostFix = 'product';
const query = `
  query {
    searchResult(CategoryURL: "beer", limit: 60, offset: 0, DisplayPrice__gte: 0, DisplayPrice__lte: 10000, BlockID: 0, Filters: "") {
        pageInfo {
            totalCount
            hasNextPage
            hasPreviousPage
        }
        edges {
            node {
                ContainerType
                ProductType
                ID
                Title
                URLSegment
                InternalItemID
                Brand
                Varietal
                LiquorStyle
                BrandRegion
                BrandCountry
                DisplayRRP
                DisplayPrice
                ReSizedDefaultImage
                ReSizedProductListingImage
                UnitRRP
                UnitPrice
                CaseRRP
                CasePrice
                SoldAt
                StockForMelbourne
                StockForSydney
                StockForAdelaide
                StockForBrisbane
                StockForCairns
                WholesaleUnitsPerCase
                ItemsInCase
                SellByPackageOnly
                WebCategory
                Created
                EnCreated
                HasCocktails
                LoyaltyPoints
                SupplierLoyaltyPoints
                BonusLoyaltyPoints
                PointsExcludedFromRetail
                WetTax
                SplitPackSize
                CaseCostMelbourne
                CaseCostSydney
                CaseCostAdelaide
                CaseCostBrisbane
                CaseCostCairns
                SplitCaseSurchargesJSON
                LongtermOOS {
                  edges {
                    node {
                      ID
                      Location {
                        ID
                      }
                      Date
                    }
                  }
                }

            }
        }
    }
  }
`;
//return await makeGraphqlApiCall(endpointPostFix, query);

}




/*
test('Product Search Wholesaler', async ({ page,context }) => {
  await LoginWholesaler(page, '3454', 'Test123');

  // const SearchField = page.locator('.form-control');
  // await SearchField.fill('11131');
  // const SearchButton = page.locator('button.btn[title="Search"]').first();
  // await SearchButton.click();
  // const cookies = await context.cookies();
  // cookies.forEach(obj => {
  //   if (obj.name == 'PHPSESSID' || obj.name == 'PHPSESSID_2')
  //   cookiesList[obj.name] = obj.value
  // });


  //console.log(cookiesList);

  // console.log('Stored Cookies of 3454',cookies)



  //const response = await SearchResultQuery();
  //console.log('Test Function',response);
  //await LogoutWholesaler(page);
});
*/
module.exports = {
  LoginWholesaler,
  LogoutWholesaler
};


