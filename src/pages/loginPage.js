import BasePage from './basePage.js';

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.emailInput    = 'input[name="username"]';
        this.passwordInput = 'input[name="password"]';
        this.submitButton  = 'button[type="submit"]';
        this.errorMsgText  = 'p[class*="MuiFormHelperText"]';
    }

    async enterEmail(email) {
        await this.fill("Email field", this.emailInput, email);
    }

    async enterPassword(password) {
        await this.fill("Password Field", this.passwordInput, password);
    }

    async submit() {
        await this.click("login button", this.submitButton);
    }

    async getErrorMsg(){
        await this.getTextContent(this.errorMsgText);                                                                       
    }
}

module.exports = LoginPage;
