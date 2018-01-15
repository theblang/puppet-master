const puppeteer = require('puppeteer');
const Page = require('./node_modules/puppeteer/lib/Page');
const $ = require('jquery');
const vm = require('vm');

module.exports = {
    test: async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://example.com');
        // const content = await page.content();
        const content = await page.evaluate(() => document.body.innerHTML);
        await browser.close();
        return $.parseHTML(content);
    },

    getPageProperties: () => {
        return Object.getOwnPropertyNames(Page.prototype);
    },

    run: async () => {
        const code = `
            (async(puppeteer) => {
                const browser = await puppeteer.launch({
                    headless: false,
                    slowMo: 1000
                });
                const page = await browser.newPage();

                await page.goto('https://example.com');
                await page.goto('https://google.com');
                await page.goto('https://example.com');

                await browser.close();
            });
        `;

        vm.runInThisContext(code)(puppeteer);
    }
};
