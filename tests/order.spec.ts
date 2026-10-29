import { test, expect } from '@playwright/test';

test('fill all fields and submit order', async ({ page }) => {
  await page.goto('https://basic-ui.tl-academy.ee/en/');
  await expect(page.getByTestId('create-order-button')).toBeDisabled();

 //fill first name
  await page.getByTestId('first-name-input').fill('Sree');
  await expect(page.getByTestId('create-order-button')).toBeDisabled();

  //fill last name
  await page.getByTestId('last-name-input').fill('Lakshmi');
  await expect(page.getByTestId('create-order-button')).toBeDisabled();

  //fill email
  await page.getByTestId('email-input').fill('sreelakshmi@gmail.com');
  await expect(page.getByTestId('create-order-button')).toBeDisabled();

  //fill address
  await page.getByTestId('address-input').fill('Estonia, Parnu,6');

  //click 'create order'
  await page.getByTestId('create-order-button').click();

  // Expect success message is visible > order-success
  await expect(page.getByTestId('order-success')).toBeVisible();
});

test('shows error on invalid  email and create order button disabled', async ({ page }) => {
  await page.goto('https://basic-ui.tl-academy.ee/en/');

  //fill first name
  await page.getByTestId('first-name-input').fill('Sree');
  await page.getByTestId('last-name-input').fill('Lakshmi');
  //fill email
  await page.getByTestId('email-input').fill('sreelakshmi@');
  await page.getByTestId('address-input').fill('Estonia, Parnu,6');
  //check error
  await expect(page.getByTestId('email-error')).toBeVisible();
  await expect(page.getByTestId('create-order-button')).toBeDisabled();
});

test('shows error on each field', async ({ page }) => {
  await page.goto('https://basic-ui.tl-academy.ee/en/');

  //fill first name
  await page.getByTestId('first-name-input').click();
  await page.getByTestId('last-name-input').click();
  //firstname error
  await expect(page.getByTestId('first-name-error')).toBeVisible();

  await page.getByTestId('email-input').click();
  //last name error
  await expect(page.getByTestId('last-name-error')).toBeVisible();
  await page.getByTestId('address-input').click();
  //email error
  await expect(page.getByTestId('email-error')).toBeVisible();
  await page.getByTestId('first-name-input').click();
  //address error
  await expect(page.getByTestId('address-error')).toBeVisible();
});

