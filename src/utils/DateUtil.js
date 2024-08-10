const moment = require('moment'); 

class DateUtil {
   /**
    * Generates date based on the input
    * @param {string} format 
    * @param {number} days 
    * @param {number} months 
    * @param {number} years 
    * @returns {string} Generated date in the specified format
    */
   static dateGenerator(format, days, months, years) {
      const date = moment().add(days, 'd').add(months, 'M').add(years, 'y').format(format);   
      return date;
   }

   /**
    * Customizes the date that has been given as input based on other input parameter
    * @param {string} date 
    * @param {string} format 
    * @param {number} days 
    * @param {number} months 
    * @param {number} years 
    * @returns {string} Customized date in the specified format
    */
   static dateCustomizer(date, format, days, months, years) {
      const customDate = moment(date, format).add(days, 'd').add(months, 'M').add(years, 'y').format(format);
      return customDate;
   }

   /**
    * Generates time in hr:min format based on the input
    * @param {string} format 
    * @param {number} hours 
    * @param {number} minutes 
    * @returns {string} Generated time in the specified format
    */
   static timeGenerator(format, hours, minutes) {
      const time = moment().add(minutes, 'm').add(hours, 'h').format(format);
      return time;
   }
}

module.exports = DateUtil;
