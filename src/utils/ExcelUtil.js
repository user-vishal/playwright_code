const XLSX = require('xlsx');

class ExcelUtil {

    /**
     * Read the value of a specific column from a specific row in an Excel file.
     * @param {string} filePath - The path to the file.
     * @param {string} fileName - The name of the file.
     * @param {string} sheetName - The name of the sheet.
     * @param {string} attributeName - The name of the attribute/column.
     * @param {number} rowIndex - The index of the row (1-based).
     * @returns {string} - The value in the specified row and column.
     */
    static readColumnValueFromExcel(filePath, sheetName, attributeName, rowIndex) {
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[sheetName];

        if (!sheet) {
            throw new Error(`Sheet ${sheetName} not found in ${filePath}`);
        }

        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const firstRow = data[0];

        // Find the column index
        let columnNo = -1;
        for (let j = 0; j < firstRow.length; j++) {
            if (firstRow[j] === attributeName) {
                columnNo = j;
                break;
            }
        }

        if (columnNo === -1) {
            throw new Error(`Column ${attributeName} not found in sheet ${sheetName}`);
        }

        // Get the value from the specified row and column
        const rowValue = data[rowIndex] ? data[rowIndex][columnNo] : '';
        return rowValue ? rowValue.toString().trim() : '';
    }
}


module.exports = ExcelUtil;
