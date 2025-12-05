const fs = require("fs");
const path = require("path");

class ScreenshotHelper {
  constructor() {
    this.screenshotDir = path.join(process.cwd(), "screenshots");
    this.ensureScreenshotDirectory();
  }

  ensureScreenshotDirectory() {
    if (!fs.existsSync(this.screenshotDir)) {
      fs.mkdirSync(this.screenshotDir, { recursive: true });
      global.log.info(`Created screenshots directory: ${this.screenshotDir}`);
    }
  }

  generateFileName(testName, status = "failure") {
    const timestamp = new Date()
      .toISOString()
      .replace(/:/g, "-")
      .replace(/\..+/, "");
    const sanitizedTestName = testName
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
    return `${status}_${sanitizedTestName}_${timestamp}.png`;
  }

  async takeScreenshot(testName, status = "failure") {
    try {
      const fileName = this.generateFileName(testName, status);
      const filePath = path.join(this.screenshotDir, fileName);

      await browser.saveScreenshot(filePath);

      global.log.info(`Screenshot saved: ${filePath}`);
      return filePath;
    } catch (error) {
      global.log.error(`Failed to take screenshot: ${error.message}`);
      return null;
    }
  }

  async captureFailure(test) {
    const testName = test.title || "unknown_test";
    global.log.error(`Test failed: ${testName}`);
    await this.takeScreenshot(testName, "failure");
  }
}

module.exports = new ScreenshotHelper();
