class CartPage {
    constructor(page) {
        this.page = page;

        this.cartItems = page.locator('.inventory_item_name');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    async getItems() {
        return this.cartItems.allTextContents();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }
}

module.exports = { CartPage };