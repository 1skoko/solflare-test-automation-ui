const BasePage = require("./base.page");

class DashboardPage extends BasePage {
  get walletManagementBtn() {
    return $('div[data-testid="icon-section-wallet-picker-arrow-right"]');
  }

  get mainWalletTitle() {
    return $('div[data-testid="list-item-m-title"]');
  }

  get mainWalletAddress() {
    return $('p[data-testid^="list-item-m-subtitle"]');
  }

  get allToggles() {
    return $$('div[data-testid="virtuoso-item-list"] button[role="switch"]');
  }

  get getAllWalletAddresses() {
    return $$('div[data-testid="virtuoso-item-list"] span > span');
  }

  get addWalletBtn() {
    return $('a[data-testid="icon-btn-add"]');
  }

  get manageRecoveryPhraseBtn() {
    return $('div[data-testid="li-add-wallet-mnemonic-manage"]');
  }

  get saveBtn() {
    return $('button[data-testid="btn-save"]');
  }

  get walletManagementContainer() {
    return $('div[data-testid="section-header_account_recovery_phrase"]');
  }

  get allWalletAddressesOnManagementPage() {
    return this.walletManagementContainer.$$(
      'p[data-testid="list-item-m-subtitle"]'
    );
  }

  async clickWalletManagement() {
    try {
      global.log.info("Clicking Wallet Management button");
      await this.click(this.walletManagementBtn);
    } catch (error) {
      global.log.error(
        `Failed to click Wallet Management button: ${error.message}`
      );
      throw error;
    }
  }

  async isMainWalletVisible() {
    try {
      global.log.info("Checking if main wallet is visible");
      await this.waitForVisible(this.mainWalletTitle);
      return await this.mainWalletTitle.isDisplayed();
    } catch (error) {
      global.log.error(
        `Failed to check main wallet visibility: ${error.message}`
      );
      throw error;
    }
  }

  async getMainWalletAddress() {
    try {
      global.log.info("Fetching main wallet address");
      return await this.mainWalletAddress.getText();
    } catch (error) {
      global.log.error(`Failed to fetch main wallet address: ${error.message}`);
      throw error;
    }
  }

  async clickAddWallet() {
    try {
      global.log.info("Clicking Add Wallet button");
      await this.click(this.addWalletBtn);
    } catch (error) {
      global.log.error(`Failed to click Add Wallet button: ${error.message}`);
      throw error;
    }
  }

  async clickManageRecoveryPhrase() {
    try {
      global.log.info("Clicking Manage Recovery Phrase button");
      await this.click(this.manageRecoveryPhraseBtn);
    } catch (error) {
      global.log.error(
        `Failed to click Manage Recovery Phrase button: ${error.message}`
      );
      throw error;
    }
  }

  async clickToggleByIndex(index) {
    try {
      global.log.info(`Clicking toggle at index ${index}`);
      const listContainer = await $('div[data-testid="virtuoso-item-list"]');
      await listContainer.scrollIntoView();
      const toggles = await this.allToggles;
      await toggles[index].click();
    } catch (error) {
      global.log.error(
        `Failed to click toggle at index ${index}: ${error.message}`
      );
      throw error;
    }
  }

  async getToggleState(index) {
    try {
      global.log.info(`Getting state of toggle at index ${index}`);
      const listContainer = await $('div[data-testid="virtuoso-item-list"]');
      await listContainer.scrollIntoView();
      const toggles = await this.allToggles;
      const toggle = toggles[index];
      if (!toggle) throw new Error(`Toggle at index ${index} does not exist`);
      const state = await toggle.getAttribute("aria-checked");
      return state === "true";
    } catch (error) {
      global.log.error(
        `Failed to get toggle state at index ${index}: ${error.message}`
      );
      throw error;
    }
  }

  async isToggleDisabled(index) {
    try {
      global.log.info(`Checking if toggle at index ${index} is disabled`);
      const listContainer = await $('div[data-testid="virtuoso-item-list"]');
      await listContainer.scrollIntoView();
      await browser.waitUntil(
        async () => (await this.allToggles).length > index,
        {
          timeout: 10000,
          timeoutMsg: `Toggle at index ${index} not rendered yet`,
        }
      );
      const toggles = await this.allToggles;
      const toggle = toggles[index];
      if (!toggle) throw new Error(`Toggle at index ${index} does not exist`);
      const disabled = await toggle.getAttribute("disabled");
      return disabled !== null;
    } catch (error) {
      global.log.error(
        `Failed to check if toggle at index ${index} is disabled: ${error.message}`
      );
      throw error;
    }
  }

  async getWalletAddressByIndex(index) {
    try {
      global.log.info(`Fetching wallet address at index ${index}`);
      const elements = await this.getAllWalletAddresses;
      return await elements[index].getText();
    } catch (error) {
      global.log.error(
        `Failed to fetch wallet address at index ${index}: ${error.message}`
      );
      throw error;
    }
  }

  async clickSave() {
    try {
      global.log.info("Clicking Save button");
      await this.click(this.saveBtn);
    } catch (error) {
      global.log.error(`Failed to click Save button: ${error.message}`);
      throw error;
    }
  }

  async fetchAllWalletAddressesOnManagementPage() {
    try {
      global.log.info("Fetching all wallet addresses on management page");
      const elements = await this.allWalletAddressesOnManagementPage;
      if (!elements || elements.length === 0) {
        global.log.warn(
          "No wallet address elements found on the management page"
        );
        return [];
      }
      const addresses = [];
      for (const el of elements) {
        addresses.push(await el.getText());
      }
      return addresses;
    } catch (error) {
      global.log.error(
        `Failed to fetch wallet addresses on management page: ${error.message}`
      );
      throw error;
    }
  }
}

module.exports = new DashboardPage();
