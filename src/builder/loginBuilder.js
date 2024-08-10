class LoginBuilder {
    constructor(email, password) {
      this._email = email;
      this._password = password;
    }
  
    // Getter for email
    get email() {
      return this._email;
    }
  
    // Setter for email
    set email(value) {
      this._email = value;
    }
  
    // Getter for password
    get password() {
      return this._password;
    }
  
    // Setter for password
    set password(value) {
      this._password = value;
    }
  }
  
  module.exports = LoginBuilder;
  