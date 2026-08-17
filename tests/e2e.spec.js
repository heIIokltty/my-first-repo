const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutStepOnePage } = require('../pages/CheckoutStepOnePage');
const { CheckoutStepTwoPage } = require('../pages/CheckoutStepTwoPage');
const { CheckoutCompletePage } = require('../pages/CheckoutCompletePage');


test('E2E покупка самого дорогого товара', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.open();


    await loginPage.login('standard_user', 'secret_sauce');


    const pageTitle = await inventoryPage.getPageTitle();


    expect(pageTitle).toBe('Products');


    const mostExpensiveItem =
        await inventoryPage.getMostExpensiveItemName();

    console.log('Самый дорогой товар:', mostExpensiveItem);


    await inventoryPage.addItemToCart(mostExpensiveItem);


    await inventoryPage.openCart();


    const cartItems = await cartPage.getItems();

    expect(cartItems).toContain(mostExpensiveItem);


    await cartPage.goToCheckout();


    await checkoutStepOnePage.fillUserInfo(
        'Test',
        'User',
        '12345'
    );


    await checkoutStepTwoPage.finishCheckout();


    const completionMessage =
        await checkoutCompletePage.getCompletionMessage();

    expect(completionMessage).toBe('Thank you for your order!');
});