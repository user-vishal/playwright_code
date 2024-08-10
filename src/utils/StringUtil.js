const randomString = require('randomstring');
const format = require('string-format');

class StringUtil {
  /**
   * This method will return the formatted String by replacing value in {\d}
   * @param {string} str - String to be formatted
   * @param {string[]} replaceValue - Values to replace in the formatted string
   * @returns {string} Formatted string
   */
  static formatString(str, ...replaceValue) {
    for (let i = 0; i < replaceValue.length; i++) {
      str = str.split(`{${i}}`).join(replaceValue[i]);
    }
    return str;
  }

  /**
   * This method will return the formatted String by replacing value in {key}
   * @param {string} str - String to be formatted
   * @param {Object} replaceValue - Values to replace in the formatted string
   * @returns {string} Formatted string
   */
  static formatStringValue(str, replaceValue) {
    for (const [key, value] of Object.entries(replaceValue)) {
      str = str.split(`{${key}}`).join(`${value}`);
    }
    return str;
  }

  /**
   * Replaces all occurrences of a substring within a string.
   * @param {string} str - Original string
   * @param {string} searchValue - Substring to search for
   * @param {string} replaceValue - Replacement string
   * @returns {string} String with replacements
   */
  static replaceAll(str, searchValue, replaceValue) {
    const replacer = new RegExp(searchValue, 'g');
    const replacedStr = str.replace(replacer, replaceValue);
    return replacedStr;
  }

  /**
   * Replaces text in a string using a regular expression.
   * @param {string} str - Original string
   * @param {RegExp} regex - Regular expression to search for
   * @param {string} value - Replacement string
   * @returns {string} String with replacements
   */
  static getRegXLocator(str, regex, value) {
    return str.replace(regex, value);
  }

  /**
   * Generates a random alphanumeric string of given length.
   * @param {number} length - Length of the generated string
   * @returns {string} Random alphanumeric string
   */
  static randomAlphanumericString(length) {
    const str = randomString.generate(length);
    return str;
  }

  /**
   * Generates a random alphabetic string of given length.
   * @param {number} length - Length of the generated string
   * @returns {string} Random alphabetic string
   */
  static randomAlphabeticString(length) {
    const str = randomString.generate({ length: length, charset: 'alphabetic' });
    return str;
  }

  /**
   * Generates a random string of given length with all letters as uppercase.
   * @param {number} length -
   * @returns {string} 
   */
  static randomUppercaseString(length) {
    const str = randomString.generate({ length: length, charset: 'alphabetic', capitalization: "uppercase" });
    return str;
  }

  /**
   * Generates a random string of given length with all letters as lowercase.
   * @param {number} length - 
   * @returns {string} 
   */
  static randomLowercaseString(length) {
    const str = randomString.generate({ length: length, charset: 'alphabetic', capitalization: "lowercase" });
    return str;
  }

  /**
   * Generates a random numeric string of given length.
   * @param {number} length - 
   * @returns {string} 
   */
  static randomNumberString(length) {
    const str = randomString.generate({ length: length, charset: 'numeric' });
    return str;
  }

  /**
   * This method will return the formatted String by replacing value in {key} from Object
   * @param {string} str -
   * @param {Object} obj - 
   * @returns {string}
   */
  static formatStringFromObject(str, obj) {
    return format(str, obj);
  }
}

module.exports = StringUtil;
