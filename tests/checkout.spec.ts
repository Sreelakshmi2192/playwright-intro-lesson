import {expect, test} from "@playwright/test";

test('shows success message when order created', async ({ page }) => {
    await page.goto('https://shop.tl-academy.ee/checkout');

    await page.getByTestId('email-input').fill('sreelakshmi@gmail.com');
    await page.getByTestId('name-input').fill('Sree Lakshmi');
    //check button enabled
    await expect(page.getByTestId('place-order-button')).toBeEnabled();
    //click on place order button
    await page.getByTestId('place-order-button').click();
    //check success message
    await expect(page.getByTestId('order-message')).toBeVisible();
});
//default state: button disabled + deliver method is parcel +payment method is bank card
test('default state validation', async ({ page }) => {
    await page.goto('https://shop.tl-academy.ee/checkout');

    //1. check button disabled
    await expect(page.getByTestId('place-order-button')).toBeDisabled();
    //2. radio parcel is active> delivery-parcel-locker-radio
    await expect(page.getByTestId('delivery-parcel-locker-radio')).toBeChecked();
    //delivery-home-radio
    await expect(page.getByTestId('delivery-home-radio')).not.toBeChecked();
    //3. radio bank card is active> payment-card-radio
    await expect(page.getByTestId('payment-card-radio')).toBeChecked();
    //payment-paypal-radio
    await expect(page.getByTestId('payment-paypal-radio')).toBeChecked({checked: false});
});

test('shows error on invalid input on each field', async ({ page }) => {
    await page.goto('https://shop.tl-academy.ee/checkout');

    await page.getByTestId('email-input').fill('sreela');
    await page.getByTestId('name-input').fill('Sree');
    //check error>email-error
    await expect(page.getByTestId('email-error')).toBeVisible();

    await page.getByTestId('delivery-title').click();
    //click error>name-error
    await expect(page.getByTestId('email-error')).toBeVisible();
});