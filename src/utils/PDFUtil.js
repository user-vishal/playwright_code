const fs = require('fs');
const pdfParse = require('pdf-parse');

class PDFUtil {
    /**
     * Gets the text content of the pdf file
     * @param {string} filePath - 
     * @returns {Promise<string>} 
     */
    static async getText(filePath) {
        const buffer = fs.readFileSync(filePath);
        try {
            const data = await pdfParse(buffer);
            return data.text;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * Gets number of pages in pdf file
     * @param {string} filePath - 
     * @returns {Promise<number>}
     */
    static async getNumberOfPages(filePath) {
        const buffer = fs.readFileSync(filePath);
        try {
            const data = await pdfParse(buffer);
            return data.numpages;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * Gets the information about the pdf file
     * @param {string} filePath - 
     * @returns {Promise<any>}
     */
    static async getInfo(filePath) {
        const buffer = fs.readFileSync(filePath);
        try {
            const data = await pdfParse(buffer);
            return data.info;
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = PDFUtil;
