# Solflare Wallet Test Automation


## 📋 Prerequisites


- **Node.js** (v21 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Google Chrome** and (or) **Firefox** browser

To verify your installation:
```bash
node --version
npm --version
```

## 🚀 Installation

### 1. Clone or Download the Project

```bash
cd webdriverio-solflare-project
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- WebdriverIO
- Mocha (test framework)
- Chromedriver/Geckodriver
- Other test utilities

### 3. Create Environment File (Optional)

Create a `.env` file in the project root if you want to customize settings:

```bash
touch .env
```

Add configuration variables (optional):
```
BASE_URL=https://solflare.com/onboard
BROWSER=chrome
HEADLESS=false
```

## 📁 Project Structure

```
webdriverio-solflare-project/
├── test/
│   ├── pageobjects/
│   │   ├── base.page.js           # Base page with common methods
│   │   ├── onboard.page.js        # Onboarding page objects
│   │   └── dashboard.page.js      # Dashboard page objects
│   ├── specs/
│   │   └── test.e2e.js            # Main test suite
│   └── utils/
│       └── screenshot.helper.js    # Screenshot utility
├── screenshots/                    # Auto-generated screenshots
├── wdio.conf.js                   # WebdriverIO configuration
├── package.json
└── README.md
```

## 🏃 Running Tests

### Run All Tests (Default - Chrome Headless)

```bash
npx wdio run wdio.conf.js
```

### Run Tests with Visible Browser (Chrome)

```bash
npx wdio run wdio.conf.js HEADLESS=false
```

### Run Tests in Different Browsers

**Chrome (visible):**
```bash
npx wdio run wdio.conf.js BROWSER=chrome HEADLESS=false
```

**Firefox (visible):**
```bash
npx wdio run wdio.conf.js BROWSER=firefox HEADLESS=false
```

**Firefox (headless):**
```bash
npx wdio run wdio.conf.js BROWSER=firefox HEADLESS=true
```

**Chrome (headless - default):**
```bash
npx wdio run wdio.conf.js BROWSER=chrome HEADLESS=true
```

### Run Tests with Custom Base URL

```bash
npx wdio run wdio.conf.js BASE_URL=https://solflare.com/onboard
```

### Combine Multiple Options

```bash
npx wdio run wdio.conf.js BROWSER=firefox HEADLESS=false BASE_URL=https://solflare.com/onboard
```

### Using npm script (if configured in package.json)

```bash
npm test
```

## 🔧 Configuration Options

You can configure tests via command-line arguments or environment variables:

| Option | Default | Description |
|--------|---------|-------------|
| `BROWSER` | `chrome` | Browser to use (`chrome` or `firefox`) |
| `HEADLESS` | `true` | Run browser in headless mode (`true` or `false`) |
| `BASE_URL` | `https://solflare.com/onboard` | Starting URL for tests |

## 📸 Screenshots

Screenshots are automatically captured on test failures and saved to the `screenshots/` directory with the format:

```
failure_test_name_YYYY-MM-DDTHH-MM-SS.png
```

Example:
```
screenshots/failure_should_complete_full_wallet_onboarding_2025-12-05T19-30-45.png
```

## 📊 Test Reports

Test results are displayed in the console with detailed logging:

```
[INFO] STEP 1: Navigated to https://solflare.com/onboard
[INFO] STEP 2: Clicking 'I need a new wallet' button
[INFO] Starting new wallet
[INFO] STEP 3: Reading recovery phrase
...
✓ should complete full wallet onboarding and management flow
```

## 🧪 What the Test Does

The test automates the following workflow:

1. ✅ Navigate to Solflare onboarding page
2. ✅ Create a new wallet
3. ✅ Read and save recovery phrase (12 words)
4. ✅ Confirm recovery phrase by entering it
5. ✅ Set up wallet password
6. ✅ Complete onboarding process
7. ✅ Navigate to wallet management
8. ✅ Verify main wallet is displayed
9. ✅ Add additional wallets (3rd and 4th)
10. ✅ Verify wallet toggles and states
11. ✅ Save wallet configuration
12. ✅ Verify all selected wallets appear in management page



---

**Need Help?** Check the `screenshots/` folder for visual debugging or review the console logs for detailed error messages.
