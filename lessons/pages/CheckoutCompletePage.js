class CheckoutCompletePage {
    constructor(page) {
        this.page = page;

        this.completionMessage = page.locator('.complete-header');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async getCompletionMessage() {
        return await this.completionMessage.textContent();
    }

    async backHome() {
        await this.backHomeButton.click();
    }
}

module.exports = { CheckoutCompletePage };