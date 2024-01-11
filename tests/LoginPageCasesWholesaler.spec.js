
// @ts-check
const { test, expect, selectors } = require('@playwright/test');

test('LoginPage', async ({ page }) => {


  const SignInButton = page.locator('//*[@id="header"]/div[1]/div/div/div[3]/a[2]');
  const UserName = page.locator('//*[@id="login"]/form/div[1]/div[1]/label/input');
  const PassWord = page.locator('//*[@id="login"]/form/div[1]/div[2]/label/input');
  const SubmitButton = page.locator('//*[@id="login"]/form/div[2]/div[1]/button');
  const AccountLink = page.locator('a[href="/wholesaler/"].menu__link[title="Account"]');
  const LogOut = page.locator('a.submenu__link[title="Logout"]')

  await page.goto('https://paramount.visualr.dev');
  await page.waitForLoadState('networkidle');



  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Home/);

  // Click the SIGN IN Button link.
  SignInButton.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*login/);

  await UserName.fill('5675');
  await PassWord.fill('Temp/123')
  await SubmitButton.click();

  await page.waitForNavigation();
  // Expects the URL to contain wholesaler.
  await expect(page).toHaveURL(/.*wholesaler/);
  await page.waitForLoadState('networkidle');
  await AccountLink.first().hover();
  await LogOut.first().click();

  //   await expect(page).toHaveURL('https://paramount.visualr.dev/');
  //   // Click the SIGN IN Button link.
  // SignInButton.click();

  // // Expects the URL to contain intro.
  // await expect(page).toHaveURL(/.*login/);


  // //wait for username and password to be filled
  // await page.waitForSelector('//*[@id="login"]/form/div[1]/div[1]/label/input');
  // await page.waitForSelector('//*[@id="login"]/form/div[1]/div[2]/label/input');

});

const credentials = [
  { username: '105457', password: 'qwerty' },
  { username: '162538', password: 'qwerty' },
  { username: '106253', password: 'test1234' }
];

test('LoginPage with Dynamic Credentials Using Array', async ({ page }) => {

  const SignInButton = page.locator('//*[@id="header"]/div[1]/div/div/div[3]/a[2]');
  const UserName = page.locator('//*[@id="login"]/form/div[1]/div[1]/label/input');
  const PassWord = page.locator('//*[@id="login"]/form/div[1]/div[2]/label/input');
  const SubmitButton = page.locator('//*[@id="login"]/form/div[2]/div[1]/button');
  const AccountLink = page.locator('a[href="/wholesaler/"].menu__link[title="Account"]');
  const LogOut = page.locator('a.submenu__link[title="Logout"]');

  await page.goto('https://paramount.visualr.dev');
  await page.waitForLoadState();



  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Home | Paramount Liquor/);

  // Click the SIGN IN Button link.
  SignInButton.click();

  for (const { username, password } of credentials) {
    await UserName.fill(username);
    await PassWord.fill(password);
    await SubmitButton.click();

    await page.waitForNavigation();
    // Expects the URL to contain wholesaler.
    await expect(page).toHaveURL(/.*wholesaler/);
    await AccountLink.first().hover();
    await LogOut.first().click();

    await expect(page).toHaveURL('https://paramount.visualr.dev/');
    // Click the SIGN IN Button link.
    SignInButton.click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*login/);

    //console.log({UserName},"Username hamara");

    //wait for username and password to be filled
    await page.waitForSelector('//*[@id="login"]/form/div[1]/div[1]/label/input');
    await page.waitForSelector('//*[@id="login"]/form/div[1]/div[2]/label/input');
  }
})

