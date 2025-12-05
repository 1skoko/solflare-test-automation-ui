const OnboardPage = require("../pageobjects/onboard.page");
const DashboardPage = require("../pageobjects/dashboard.page");

describe("Solflare Wallet", () => {
  it("should complete full wallet onboarding and management flow", async () => {
    let mnemonicPhrase;
    let randomPassword;
    const selectedWallets = [];

    global.log.info("STEP 1: Navigated to https://solflare.com/onboard");

    global.log.info("STEP 2: Clicking 'I need a new wallet' button");
    await OnboardPage.startNewWallet();

    global.log.info("STEP 3: Reading recovery phrase");
    mnemonicPhrase = await OnboardPage.getRecoveryPhrase();
    expect(mnemonicPhrase).toBeTruthy();
    expect(mnemonicPhrase.split(" ").length).toBe(12);
    global.log.info(`Recovery phrase obtained: ${mnemonicPhrase}`);

    global.log.info("STEP 4: Clicking 'I saved my recovery phrase' button");
    await OnboardPage.clickSavedRecoveryPhrase();

    global.log.info("STEP 5: Entering recovery phrase");
    await OnboardPage.enterRecoveryPhrase(mnemonicPhrase);

    global.log.info("STEP 6: Clicking 'Continue' button");
    await OnboardPage.clickContinue();

    global.log.info("STEP 7: Generating and entering password");
    randomPassword = await OnboardPage.generateRandomPassword();
    expect(randomPassword).toBeTruthy();
    global.log.info(`Password generated with length: ${randomPassword.length}`);

    global.log.info("STEP 8: Entering password in both fields");
    await OnboardPage.enterPassword(randomPassword);

    global.log.info("STEP 9: Clicking 'Continue' button");
    await OnboardPage.clickContinue();

    global.log.info("STEP 10: Clicking 'I agree, let's go' button");
    await OnboardPage.clickAgreeLetsGo();

    global.log.info("STEP 11: Clicking 'Wallet management' button");
    await DashboardPage.clickWalletManagement();

    global.log.info("STEP 12: Verifying Main wallet is displayed");
    const isMainWalletVisible = await DashboardPage.isMainWalletVisible();
    expect(isMainWalletVisible).toBe(true);
    global.log.info("Main wallet is visible");

    global.log.info("STEP 13: Clicking '+ Add wallet' button");
    await DashboardPage.clickAddWallet();

    global.log.info("STEP 14: Clicking 'Manage recovery phrase' button");
    await DashboardPage.clickManageRecoveryPhrase();

    global.log.info("STEP 15: Verifying first toggle is disabled");
    const isFirstToggleDisabled = await DashboardPage.isToggleDisabled(0);
    expect(isFirstToggleDisabled).toBe(true);
    global.log.info("First toggle is disabled (as expected)");

    global.log.info("STEP 16: Verifying first toggle is on");
    const isFirstToggleOn = await DashboardPage.getToggleState(0);
    expect(isFirstToggleOn).toBe(true);
    global.log.info("First toggle is on (as expected)");

    global.log.info("STEP 17: Selecting 3rd and 4th wallet (indices 2 and 3)");
    const toggleIndicesToClick = [2, 3];
    for (const index of toggleIndicesToClick) {
      await DashboardPage.clickToggleByIndex(index);
      global.log.info(`Selected wallet at index ${index}`);
    }

    global.log.info("Collecting addresses of selected wallets");
    const selectedWalletIndices = [0, 2, 3];
    for (const index of selectedWalletIndices) {
      const address = await DashboardPage.getWalletAddressByIndex(index);
      expect(address).toBeTruthy();
      selectedWallets.push(address);
      global.log.info(`Wallet ${index} address: ${address}`);
    }

    global.log.info("STEP 18: Clicking 'Save' button");
    await DashboardPage.clickSave();

    global.log.info(
      "EXPECTED RESULT: Verifying recovery phrase list contains all selected wallets"
    );
    const allWalletAddresses =
      await DashboardPage.fetchAllWalletAddressesOnManagementPage();
    global.log.info(
      `Total wallets on management page: ${allWalletAddresses.length}`
    );
    global.log.info(`Expected wallets: ${selectedWallets.length}`);

    expect(allWalletAddresses.length).toBeGreaterThanOrEqual(
      selectedWallets.length
    );

    selectedWallets.forEach((wallet, index) => {
      expect(allWalletAddresses).toContain(wallet);
      global.log.info(`✓ Verified wallet ${index}: ${wallet}`);
    });

    global.log.info("=== TEST COMPLETED SUCCESSFULLY ===");
    global.log.info(
      "All selected wallets (original + newly added) are present in the recovery phrase list"
    );
  });
});
