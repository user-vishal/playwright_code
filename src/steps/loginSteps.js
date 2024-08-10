import LoginPage from "../pages/loginPage.js";
import Assert from '../asserts/Assertions.js';

export class LoginSteps {
    constructor(page) {
        this.loginPage = new LoginPage(page);
    }

    async login(loginBuilder) {
        await this.loginPage.enterEmail(loginBuilder.email);
        await this.loginPage.enterPassword(loginBuilder.password);
        await this.loginPage.submit();
    }

    async goToURL(url){
       await this.loginPage.navigate(url);
    }

    async validateErrorMsg(expectedMsg){
        const actualMsg = await this.loginPage.getErrorMsg();
        Assert.assertTrue(actualMsg,expectedMsg,"Error Msg"); 
    }
}

module.exports = LoginSteps;
