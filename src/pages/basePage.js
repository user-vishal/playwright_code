import { test } from "@playwright/test";

class BasePage {

  constructor(page) {
    this.page = page;
  }

  /**
   * fill data on any selector
   * @param {*} description 
   * @param {*} selector 
   * @param {*} text 
   */
  async fill(description, selector, text) {
    try {
      await test.step(`Filling ${description} with ${text}`, async () => {
        await this.page.fill(selector, text);
      });
    } catch (error) {
      throw new Error(`Error filling ${description} with ${text}: ${error.message}`);
    }
  }

  /**
   * click on any selector
   * @param {*} description 
   * @param {*} selector 
   */
  async click(description, selector) {
    try {
      await test.step(`Clicking on ${description}`, async () => {
        await this.page.click(selector);
      });
    } catch (error) {
      throw new Error(`Error clicking ${selector}: ${error.message}`);
    }
  }

  /**
   * navigate to any url
   * @param {*} url 
   */
  async navigate(url) {
    try {
      await this.page.goto(url, { waitUntil: 'load', timeout: 70000 });
    } catch (error) {
      console.error(`Navigation to ${url} failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Enter text and hit tab key
   * @param {string} description - Description of the element.
   * @param {string} selector - The selector for the element to fill.
   * @param {string} value - The value to enter into the element.
   * @returns {Promise<void>}
   */
  async fillAndTab(description, selector, value) {
    try {
      await test.step(`Entering ${description} as ${value} and Tab`, async () => {
        await this.page.fill(selector, value);
        await this.page.press("Tab");
      });
      return this;
    } catch (error) {
      console.error(`Error while entering ${value} into ${description} and pressing Tab: ${error}`);
      throw error;
    }
  }

  /**
 * Double click on element
 */
  async doubleClick(description, selector) {
    try {
      await test.step(`Double Clicking ${description}`, async () => {
        await this.page.dblclick(selector);
      });
      return this;
    } catch (error) {
      console.error(`Error while double clicking on ${description}: ${error}`);
      throw error;
    }
  }

  /**
   * Wait for element to be invisible
   */
  async waitTillInvisible(selector) {
    try {
      await test.step(`Waiting for ${selector} to be invisible`, async () => {
        await this.page.waitForSelector(selector, { state: "hidden" });
      });
      return this;
    } catch (error) {
      console.error(`Error while waiting for ${selector} to be invisible: ${error}`);
      throw error;
    }
  }

  /**
   * Wait for element not to be present in DOM
   */
  async waitTillDetached(selector) {
    try {
      await test.step(`Wait for ${selector} to be detached from DOM`, async () => {
        await this.page.waitForSelector(selector, { state: "detached" });
      });
      return this;
    } catch (error) {
      console.error(`Error while waiting for ${selector} to be detached from DOM: ${error}`);
      throw error;
    }
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - The selector for the element to wait for.
   * @param {number} sec - The number of seconds to wait.
   */
  async waitTillVisible(selector, sec) {
    try {
      await test.step(`Wait for ${selector} to be visible in DOM`, async () => {
        await this.page.waitForSelector(selector, { state: 'visible', timeout: sec * 1000 });
      });
      return this;
    } catch (error) {
      console.error(`Error while waiting for ${selector} to be visible in DOM: ${error}`);
      throw error;
    }
  }

  /**
    * Wait for element to be attached to DOM
    * @param {string} selector - The selector for the element to wait for.
    */
  async waitForPresent(selector) {
    try {
      await test.step(`Wait for ${selector} to attach to DOM`, async () => {
        await this.page.waitForSelector(selector, { state: 'attached' });
      });
      return this;
    } catch (error) {
      console.error(`Error while waiting for ${selector} to attach to DOM: ${error}`);
      throw error;
    }
  }

  /**
   * This method hovers over the element
   * @param {string} description - Description of the element.
   * @param {string} selector - The selector for the element to hover.
   */
  async hover(description, selector) {
    try {
      await test.step(`Hovering on ${description}`, async () => {
        await this.page.hover(selector);
      });
      return this;
    } catch (error) {
      console.error(`Error while hovering on ${description}: ${error}`);
      throw error;
    }
  }

  /**
   * Returns input.value for <input> or <textarea> or <select> element.
   * @param {string} selector - The selector for the element.
   * @returns {Promise<string>}
   */
  async getInputValue(selector) {
    try {
      let value = '';
      await test.step(`Getting input value of ${selector}`, async () => {
        const element = await this.page.locator(selector);
        await element.waitForSelector();
        value = await element.inputValue();
      });
      return value;
    } catch (error) {
      console.error(`Error while getting input value of ${selector}: ${error}`);
      throw error;
    }
  }

  /**
   * Gets the text content
   * @param {string} selector - The selector for the element.
   * @returns {Promise<string>}
   */
  async getTextContent(selector) {
    try {
      let content = '';
      await test.step(`Getting text content of ${selector}`, async () => {
        await this.page.waitForSelector(selector);
        const element = this.page.locator(selector);
        content = (await element.textContent() || '').trim();
      });
      return content;
    } catch (error) {
      console.error(`Error while getting text content of ${selector}: ${error}`);
      throw error;
    }
  }

  /**
   * Get Attribute value
   * @param {string} selector - The selector for the element.
   * @param {string} attributeName - The name of the attribute.
   * @returns {Promise<string>}
   */
  async getAttribute(selector, attributeName) {
    try {
      let value = '';
      await test.step(`Getting attribute value of ${selector}`, async () => {
        const element = await this.page.locator(selector);
        await element.waitForSelector();
        value = (await element.getAttribute(attributeName) || '').trim();
      });
      return value;
    } catch (error) {
      console.error(`Error while getting attribute value of ${selector}: ${error}`);
      throw error;
    }
  }

  /**
   * Get innerHTML
   * @param {string} selector - The selector for the element.
   * @returns {Promise<string>}
   */
  async getInnerHTML(selector) {
    try {
      let text = '';
      await test.step(`Get innerHTML of ${selector}`, async () => {
        const element = await this.page.locator(selector);
        await element.waitForSelector();
        text = (await element.innerHTML() || '').trim();
      });
      return text;
    } catch (error) {
      console.error(`Error while getting innerHTML of ${selector}: ${error}`);
      throw error;
    }
  }

  /**
   * Get inner text
   * @param {string} selector - The selector for the element.
   * @returns {Promise<string>}
   */
  async getInnerText(selector) {
    try {
      let text = '';
      await test.step(`Get inner text of ${selector}`, async () => {
        const element = await this.page.locator(selector);
        await element.waitForSelector();
        text = (await element.innerText() || '').trim();
      });
      return text;
    } catch (error) {
      console.error(`Error while getting inner text of ${selector}: ${error}`);
      throw error;
    }
  }

  /**
   * Checks if element is editable
   * @param {string} selector - The selector for the element.
   * @returns {Promise<boolean>}
   */
  async isEditable(selector) {
    try {
      let status = false;
      await test.step(`Checking if ${selector} is editable`, async () => {
        const element = await this.page.locator(selector);
        await element.waitForSelector();
        status = await element.isEditable();
      });
      return status;
    } catch (error) {
      console.error(`Error while checking if ${selector} is editable: ${error}`);
      throw error;
    }
  }

  /**
  * Checks if element is enabled
  * @param {string} selector - The selector for the element.
  * @returns {Promise<boolean>}
  */
  async isEnabled(selector) {
    try {
      let status = false;
      await test.step(`Checking if ${selector} is enabled`, async () => {
        const element = await this.page.locator(selector);
        await element.waitForSelector();
        status = await element.isEnabled();
      });
      return status;
    } catch (error) {
      console.error(`Error while checking if ${selector} is enabled: ${error}`);
      throw error;
    }
  }

  /**
   * Checks if element is visible
   * @param {string} selector - The selector for the element.
   * @param {number} sec - The number of seconds to wait.
   * @returns {Promise<boolean>}
   */
  async isVisible(selector, sec) {
    try {
      let visibility = false;
      await test.step(`Checking if ${selector} is visible`, async () => {
        const element = await this.page.locator(selector);
        visibility = await element.isVisible({ timeout: sec * 1000 });
      });
      return visibility;
    } catch (error) {
      console.error(`Error while checking if ${selector} is visible: ${error}`);
      throw error;
    }
  }

  /**
   * Press a key on web element
   * @param {string} selector - The selector for the element.
   * @param {string} key - The key to press.
   * @returns {Promise<void>}
   */
  async keyPress(selector, key) {
    try {
      await test.step(`Pressing ${key} on ${selector}`, async () => {
        const element = await this.page.locator(selector);
        await element.press(key);
      });
    } catch (error) {
      console.error(`Error while pressing ${key} on ${selector}: ${error}`);
      throw error;
    }
  }

  /**
   * Get all the text content
   * @param {string} selector - The selector for the elements.
   * @returns {Promise<string[]>}
   */
  async getAllTextContent(selector) {
    try {
      let content = [];
      await test.step(`Getting all the text content of ${selector}`, async () => {
        const elements = await this.page.locator(selector);
        await elements.first().waitForSelector();
        content = await elements.allTextContents();
      });
      return content;
    } catch (error) {
      console.error(`Error while getting all the text content of ${selector}: ${error}`);
      throw error;
    }
  }

  /**
     * Get the count of elements
     * @param {string} selector - The selector for the elements.
     * @returns {Promise<number>}
     */
  async getCount(selector) {
    try {
      let count = 0;
      await test.step(`Getting the count of ${selector}`, async () => {
        count = await this.page.locator(selector).count();
      });
      return count;
    } catch (error) {
      console.error(`Error while getting the count of ${selector}: ${error}`);
      throw error;
    }
  }

  /**
   * Performs mouse click action on the element
   * @param {string} selector - The selector for the element.
   */
  async mouseClick(selector) {
    try {
      await test.step(`Clicking on ${selector}`, async () => {
        const element = await this.page.locator(selector);
        await element.scrollIntoViewIfNeeded();
        const box = await element.boundingBox();
        await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      });
      return this;
    } catch (error) {
      console.error(`Error while clicking on ${selector}: ${error}`);
      throw error;
    }
  }

  /**
  * Click on element using JavaScript
  * @param {string} selector - The selector for the element.
  * @returns {Promise<void>}
  */
  async jsClick(selector) {
    try {
      await test.step(`Clicking on ${selector} using JavaScript`, async () => {
        const element = await this.page.locator(selector);
        await element.waitForSelector();
        await element.evaluate(node => node.click());
      });
      return this;
    } catch (error) {
      console.error(`Error while clicking on ${selector} using JavaScript: ${error}`);
      throw error;
    }
  }

  /**
  * Accept alert and return alert message
  * @param {string} [promptText] - Optional text to enter in case of a prompt dialog.
  * @returns {Promise<string>} - Resolves with the message from the alert.
  */
  async accept(promptText) {
    try {
      const dialog = await this.page.waitForEvent("dialog");
      let message = '';

      if (dialog.type() === "prompt") {
        await dialog.accept(promptText);
      } else {
        await dialog.accept();
      }

      message = await dialog.message().trim();
      await dialog.dismiss(); // Dismiss the dialog after retrieving message

      return message;
    } catch (error) {
      console.error(`Error while accepting alert: ${error}`);
      throw error;
    }
  }

  /**
  * Dismiss alert and return alert message
  * @returns {Promise<string>} - Resolves with the message from the alert.
  */
  async dismiss() {
    try {
      const dialog = await this.page.waitForEvent("dialog");
      await dialog.dismiss();
      const message = await dialog.message().trim();
      return message;
    } catch (error) {
      console.error(`Error while dismissing alert: ${error}`);
      throw error;
    }
  }

}

module.exports = BasePage;

