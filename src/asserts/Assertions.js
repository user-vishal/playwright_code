import { test, expect } from "@playwright/test";

export default class Assert {
    /**
     * To verify that condition passed as input is true
     * @param {boolean} condition - boolean condition
     * @param {string} description - description of element that is being validated
     * @param {boolean} [softAssert=false] - for soft asserts this has to be set to true, else this can be ignored
     */
    static async assertTrue(condition, description, softAssert = false) {
        await test.step(`Verifying that ${description} is true`, async () => {
            try {
                expect(condition, `Expected is 'True' & Actual is '${condition}'`).toBeTruthy();
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    /**
     * To verify that value1 contains value2
     * @param {string} value1 - string input
     * @param {string} value2 - should be present in value1
     * @param {string} description - description of element that is being validated
     * @param {boolean} [softAssert=false] - for soft asserts this has to be set to true, else this can be ignored
     */
    static async assertContains(value1, value2, description, softAssert = false) {
        await test.step(`Verifying that ${description} contains text '${value2}'`, async () => {
            try {
                expect(value1, `'${value1}' is expected to CONTAIN '${value2}'`).toContain(value2);
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    /**
     * To verify that value1 contains value1 ignoring case
     * @param {string} value1 - string input
     * @param {string} value2 - should be present in value1
     * @param {string} description - description of element that is being validated
     * @param {boolean} [softAssert=false] - for soft asserts this has to be set to true, else this can be ignored
     */
    static async assertContainsIgnoreCase(value1, value2, description, softAssert = false) {
        await test.step(`Verifying that ${description} contains text '${value2}'`, async () => {
            try {
                expect(value1.toLowerCase(), `'${value1}' is expected to CONTAIN '${value2}'`).toContain(value2.toLowerCase());
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    /**
     * To verify that actual contains expected ignoring case
     * @param {string} actual - string input
     * @param {string} expected - string input
     * @param {string} description - description of element that is being validated
     * @param {boolean} [softAssert=false] - for soft asserts this has to be set to true, else this can be ignored
     */
    static async assertEqualsIgnoreCase(actual, expected, description, softAssert = false) {
        await test.step(`Verifying that ${description} has text ${expected}`, async () => {
            try {
                expect(actual.toLowerCase(), `Expected '${expected}' should be EQUAL to Actual '${actual}'`)
                    .toEqual(expected.toLowerCase());
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    /**
     * To verify actual equals expected
     * @param {any} actual - any object
     * @param {any} expected - any object to compare
     * @param {string} description - object description
     * @param {boolean} [softAssert=false] - for soft asserts this has to be set to true, else this can be ignored
     */
    static async assertEquals(actual, expected, description, softAssert = false) {
        await test.step(`Verifying that ${description} has text ${expected}`, async () => {
            try {
                expect(actual, `Expected '${expected}' should be EQUAL to Actual '${actual}'`).toEqual(expected);
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    /**
     * To verify that actual passed as input is false
     * @param {boolean} condition - boolean
     * @param {string} description - description of element that is being validated
     * @param {boolean} [softAssert=false] - for soft asserts this has to be set to true, else this can be ignored
     */
    static async assertFalse(condition, description, softAssert = false) {
        await test.step(`Verifying that ${description} is false`, async () => {
            try {
                expect(condition, `Expected is 'false' & Actual is '${condition}'`).toBeFalsy();
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    /**
     * To verify that element not contains expected
     * @param {any} actual - any value 
     * @param {any} expected - any value
     * @param {string} description - description of element that is being validated
     * @param {boolean} [softAssert=false] - for soft asserts this has to be set to true, else this can be ignored
     */
    static async assertNotContains(actual, expected, description, softAssert = false) {
        await test.step(`Verifying that ${description} does not contain '${expected}'`, async () => {
            try {
                expect(actual, `'${actual}' should NOT CONTAIN '${expected}'`).not.toContain(expected);
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    /**
     * To verify actual not equals to expected
     * @param {any} actual - any object
     * @param {any} expected - any object to compare
     * @param {string} description - object description
     * @param {boolean} [softAssert=false] - for soft asserts this has to be set to true, else this can be ignored
     */
    static async assertNotEquals(actual, expected, description, softAssert = false) {
        await test.step(`Verifying that ${description} is not equal to ${expected}`, async () => {
            try {
                expect(actual, `Expected '${expected}' should NOT be EQUAL to Actual '${actual}'`).not.toEqual(expected);
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

}
