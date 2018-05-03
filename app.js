const app = angular.module('app', []);
const puppeteer = require('puppeteer');
const vm = require('vm');

app.controller('AppController', [
    '$scope',
    '$document',
    ($scope, $document) => {
        $scope.puppeteerOptions = {
            headless: false,
            slowMo: 1000
        };
        $scope.currentHTML = {};

        const preview = $document.querySelector('#preview');
        $scope.code = `
            (async(puppeteer, $scope) => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();

                await page.goto('https://example.com');
                await page.goto('https://google.com');

                $scope.currentHTML = await page.evaluate(() => document.body.innerHTML);

                await browser.close();
            });
        `;

        // $scope.test = () => {
        //     console.log(puppeteerHelper.getPageProperties());
        // };

        $scope.addAction = () => {};

        $scope.run = async () => {
            vm.runInThisContext($scope.code)(puppeteer, $scope);
        };

        $scope.$watch('baseURL', val => {
            if (val) {
                preview.src = val;
            }
        });
    }
]);
