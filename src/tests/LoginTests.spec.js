const { test} = require('@playwright/test');

import LoginSteps from '../steps/loginSteps.js';
import LoginBuilder from '../builder/loginBuilder.js';
import ExcelUtil from '../utils/ExcelUtil';
import { testDataFilePath } from '../constants/Constants';
const loginPage = require('../pages/loginPage');


const userName          = ExcelUtil.readColumnValueFromExcel(testDataFilePath, "LoginTest", "UserName", 1);
const Password          = ExcelUtil.readColumnValueFromExcel(testDataFilePath, "LoginTest", "Password", 1);
const invalidUserName   = ExcelUtil.readColumnValueFromExcel(testDataFilePath, "LoginTest", "UserName", 2);
const invalidPassword   = ExcelUtil.readColumnValueFromExcel(testDataFilePath, "LoginTest", "Password", 2);
const expectedErrorMsg  = ExcelUtil.readColumnValueFromExcel(testDataFilePath, "LoginTest", "ErrorMessage", 2);

test.describe('Login Tests', () => {
    test('User can login with valid credentials', async ({ page }) => {
        const loginStepObj = new LoginSteps(page);
        const login = new loginPage(page);
        await login.navigate("");
        const loginBuilders = new LoginBuilder(userName, Password);
        await loginStepObj.login(loginBuilders);
    });

    test('User can login with invalid credentials', async ({ page }) => {
        const loginStepObj = new LoginSteps(page);
        const login = new loginPage(page);
        await login.navigate("");
        const loginBuilders = new LoginBuilder(invalidUserName, invalidPassword);
        await loginStepObj.login(loginBuilders);
        await loginStepObj.validateErrorMsg(expectedErrorMsg);
    });

});
