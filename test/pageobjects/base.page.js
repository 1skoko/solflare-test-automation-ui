class BasePage {
  async retry(fn, retries = 1) {
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err;
        if (attempt < retries) {
          await browser.pause(500);
        }
      }
    }
    throw lastError;
  }

  async click(element) {
    return this.retry(async () => {
      await element.waitForDisplayed({ timeout: 5000 });
      await element.click();
    });
  }

  async setValue(element, value) {
    return this.retry(async () => {
      await element.waitForDisplayed({ timeout: 5000 });
      await element.setValue(value);
    });
  }

  async getText(element) {
    return this.retry(async () => {
      await element.waitForDisplayed({ timeout: 5000 });
      return await element.getText();
    });
  }

  async waitForVisible(element, timeout = 5000) {
    return this.retry(async () => {
      await element.waitForDisplayed({ timeout });
    });
  }
}

module.exports = BasePage;
