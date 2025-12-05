const BasePage = require("./base.page");

class OnboardPage extends BasePage {
  get newWalletBtn() {
    return $('button[data-testid="btn-need-new-wallet"]');
  }

  get savedRecoveryPhraseBtn() {
    return $('button[data-testid="btn-saved-my-recovery-phrase"]');
  }

  get continueBtn() {
    return $('button[data-testid="btn-continue"]');
  }

  get agreeLetsGoBtn() {
    return $('button[data-testid="btn-explore"]');
  }

  get addWalletBtn() {
    return $('button[data-testid="btn-add-wallet"]');
  }

  get manageRecoveryPhraseBtn() {
    return $('button[data-testid="btn-manage-recovery-phrase"]');
  }

  get newPasswordInput() {
    return $('input[data-testid="input-new-password"]');
  }

  get repeatPasswordInput() {
    return $('input[data-testid="input-repeat-password"]');
  }

  async startNewWallet() {
    try {
      global.log.info("Starting new wallet");
      await this.click(this.newWalletBtn);
    } catch (error) {
      global.log.error(`Failed to start new wallet: ${error.message}`);
      throw error;
    }
  }

  async clickSavedRecoveryPhrase() {
    try {
      global.log.info("Clicking saved recovery phrase button");
      await this.click(this.savedRecoveryPhraseBtn);
    } catch (error) {
      global.log.error(
        `Failed to click saved recovery phrase button: ${error.message}`
      );
      throw error;
    }
  }

  async enterRecoveryPhrase(mnemonic) {
    try {
      global.log.info("Entering recovery phrase");
      const words = mnemonic.split(" ");
      for (let i = 0; i < words.length; i++) {
        const input = await $(
          `input[data-testid="input-recovery-phrase-${i + 1}"]`
        );
        await input.waitForDisplayed();
        await input.setValue(words[i]);
      }
    } catch (error) {
      global.log.error(`Failed to enter recovery phrase: ${error.message}`);
      throw error;
    }
  }

  async generateRandomPassword(length = 12) {
    try {
      global.log.info(`Generating random password of length ${length}`);
      const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
      let password = "";
      for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return password;
    } catch (error) {
      global.log.error(`Failed to generate random password: ${error.message}`);
      throw error;
    }
  }

  async enterPassword(password) {
    try {
      global.log.info("Entering password");
      await this.newPasswordInput.setValue(password);
      await this.repeatPasswordInput.setValue(password);
    } catch (error) {
      global.log.error(`Failed to enter password: ${error.message}`);
      throw error;
    }
  }

  async getRecoveryPhrase() {
    try {
      global.log.info("Getting recovery phrase");
      const words = [];
      for (let i = 1; i <= 12; i++) {
        const input = await $(
          `input[data-testid="input-recovery-phrase-${i}"]`
        );
        const word = await input.getValue();
        words.push(word);
      }
      return words.join(" ");
    } catch (error) {
      global.log.error(`Failed to get recovery phrase: ${error.message}`);
      throw error;
    }
  }

  async clickContinue() {
    try {
      global.log.info("Clicking Continue button");
      await this.click(this.continueBtn);
    } catch (error) {
      global.log.error(`Failed to click Continue button: ${error.message}`);
      throw error;
    }
  }

  async clickAgreeLetsGo() {
    try {
      global.log.info("Clicking Agree Let's Go button");
      await this.click(this.agreeLetsGoBtn);
    } catch (error) {
      global.log.error(
        `Failed to click Agree Let's Go button: ${error.message}`
      );
      throw error;
    }
  }
}

module.exports = new OnboardPage();
