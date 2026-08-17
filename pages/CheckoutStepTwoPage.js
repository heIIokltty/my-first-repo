class CheckoutStepTwoPage {
    constructor(page) {
        this.page = page;

        this.totalPrice = page.locator('.summary_total_label');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async getTotalPrice() {
        return await this.totalPrice.textContent();
    }
}

module.exports = { CheckoutStepTwoPage };