require("dotenv").config();
const ScreenshotHelper = require("./test/utils/screenshot.helper");

function getArgOrEnv(name, defaultValue) {
  const cliArg = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (cliArg) return cliArg.split("=")[1];
  if (process.env[name]) return process.env[name];
  return defaultValue;
}

const browserName = getArgOrEnv("BROWSER", "chrome").toLowerCase();
const headless = getArgOrEnv("HEADLESS", "true") === "true";
const baseUrl = getArgOrEnv("BASE_URL", "https://solflare.com/onboard");

exports.config = {
  runner: "local",
  specs: ["./test/specs/**/*.js"],
  maxInstances: 1,

  capabilities: [
    {
      browserName: browserName,

      "goog:chromeOptions":
        browserName === "chrome"
          ? {
              args: headless
                ? [
                    "--headless=new",
                    "--no-sandbox",
                    "--disable-dev-shm-usage",
                    "--disable-gpu",
                    "--disable-software-rasterizer",
                    "--disable-extensions",
                    "--disable-setuid-sandbox",
                    "--window-size=1920,1080",
                    "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                  ]
                : ["--disable-dev-shm-usage", "--no-sandbox"],
            }
          : undefined,

      "moz:firefoxOptions":
        browserName === "firefox"
          ? { args: headless ? ["-headless"] : [] }
          : undefined,
    },
  ],

  logLevel: "warn",
  bail: 0,
  baseUrl: baseUrl,
  waitforTimeout: 10000,

  framework: "mocha",
  reporters: ["spec"],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  before: async function () {
    global.log = {
      info: (msg) => console.log(`[INFO] ${new Date().toISOString()} ${msg}`),
      error: (msg) =>
        console.error(`[ERROR] ${new Date().toISOString()} ${msg}`),
      warn: (msg) => console.warn(`[WARN] ${new Date().toISOString()} ${msg}`),
      debug: (msg) => console.log(`[DEBUG] ${new Date().toISOString()} ${msg}`),
    };

    if (baseUrl) {
      await browser.url(baseUrl);
    }
  },

  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (!passed) {
      await ScreenshotHelper.captureFailure(test);
    }
  },
};
