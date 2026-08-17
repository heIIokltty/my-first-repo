class InventoryPage {
    constructor(page) {
        this.page = page;

        this.pageTitle = page.locator('.title');
        this.cartButton = page.locator('.shopping_cart_link');
        this.products = page.locator('.inventory_item');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    }

    async addItemToCart(itemName) {
        const item = this.products.filter({ hasText: itemName });
        await item.locator('button').click();
    }

    async sortByPriceHighToLow() {
        await this.sortDropdown.selectOption('hilo');
    }

    async getMostExpensiveItemName() {
        await this.sortByPriceHighToLow();

        const firstItem = this.products.first();

        return firstItem.locator('.inventory_item_name').textContent();
    }

    async openCart() {
        await this.cartButton.click();
    }

    async getPageTitle() {
        return this.pageTitle.textContent();
    }
}

module.exports = { InventoryPage };