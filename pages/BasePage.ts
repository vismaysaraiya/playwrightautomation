import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  // ---- Home page ----
  readonly onlineServiceHeading: Locator;
  readonly whatsNewHeading: Locator;
  readonly timeTableTab: Locator;
  readonly trackRouteTab: Locator;
  readonly movingAhmedabadHeading: Locator;
  readonly movingAhmedabadFullHeading: Locator;
  readonly aboutUsLink: Locator;
  readonly circularsLink: Locator;
  readonly galleryLink: Locator;
  readonly faqsLink: Locator;
  readonly exploreLink: Locator;

  // ---- Track Route ----
  readonly selectRouteCombobox: Locator;
  readonly trackRouteButton: Locator;
  readonly stopsText: Locator;
  readonly lalDarwajaTab: Locator;
  readonly akshardhamMandirTab: Locator;

  // ---- Timetable ----
  readonly boardingStopCombobox: Locator;
  readonly destinationStopCombobox: Locator;
  readonly searchTimeTableButton: Locator;
  readonly availableRoutesText: Locator;

  // ---- Login / OTP ----
  readonly loginRegisterLink: Locator;
  readonly mobileNumberInput: Locator;
  readonly termsCheckbox: Locator;
  readonly continueButton: Locator;
  readonly otpInputs: Locator;
  readonly loginButton: Locator;

  // ---- Grievance ----
  readonly servicesLink: Locator;
  readonly grievancesLink: Locator;
  readonly categoryCombobox: Locator;
  readonly subCategoryCombobox: Locator;
  readonly overSpeedingOption: Locator;
  readonly incidentDateTimeInput: Locator;
  readonly problemDescriptionInput: Locator;
  readonly submitGrievanceButton: Locator;
  readonly viewMyGrievancesButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Home page
    // NOTE: original spec used tab/button names with a leading space (e.g. ' Time Table')
    // which is fragile and was flagged in review. Using trimmed accessible names here —
    // re-verify against the live DOM (icon + text tabs sometimes do add a real leading space).
    this.onlineServiceHeading = page.getByRole('heading', { name: 'AMTS Online Service' });
    this.whatsNewHeading = page.getByRole('heading', { name: "What's New" });
    this.timeTableTab = page.getByRole('tab', { name: 'Time Table' });
    this.trackRouteTab = page.getByRole('tab', { name: 'Track Route' });
    this.movingAhmedabadHeading = page.getByRole('heading', { name: 'Moving Ahmedabad, every' });
    this.movingAhmedabadFullHeading = page.getByRole('heading', { name: 'Moving Ahmedabad, every single day' });
    this.aboutUsLink = page.getByRole('link', { name: 'About Us' });
    this.circularsLink = page.getByRole('link', { name: 'Circulars' });
    this.galleryLink = page.getByRole('link', { name: 'Gallery' });
    this.faqsLink = page.getByRole('link', { name: "Faq's" });
    this.exploreLink = page.getByRole('link', { name: 'Explore' });

    // Track Route
    this.selectRouteCombobox = page.getByRole('combobox', { name: 'Select a route' });
    this.trackRouteButton = page.getByRole('button', { name: 'Track Route' });
    this.stopsText = page.getByText('Stops');
    this.lalDarwajaTab = page.getByRole('tab', { name: 'Lal Darwaja' });
    this.akshardhamMandirTab = page.getByRole('tab', { name: 'Akshardham Mandir (' });

    // Timetable
    this.boardingStopCombobox = page.getByRole('combobox', { name: 'Select boarding stop' });
    this.destinationStopCombobox = page.getByRole('combobox', { name: 'Select destination stop' });
    this.searchTimeTableButton = page.getByRole('button', { name: 'Search Time Table' });
    this.availableRoutesText = page.getByText('Available Routes');

    // Login
    this.loginRegisterLink = page.getByRole('link', { name: 'Login / Register' });
    this.mobileNumberInput = page.getByRole('textbox', { name: 'Mobile Number*' });
    this.termsCheckbox = page.getByRole('checkbox', { name: 'By continuing you agree to' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    // NOTE: OTP boxes have no accessible name in the app, so a positional locator
    // is unavoidable today. Flagged risk: ask dev team to add aria-label/test-id
    // per digit (e.g. data-testid="otp-digit-0") so this can move to a stable locator.
    this.otpInputs = page.getByRole('textbox');
    this.loginButton = page.getByRole('button', { name: 'Login' });

    // Grievance
    this.servicesLink = page.getByText('Services').first();
    this.grievancesLink = page.getByRole('link', { name: 'Grievances', exact: true });
    this.categoryCombobox = page.getByRole('combobox', { name: 'Select a category...' });
    this.subCategoryCombobox = page.getByRole('combobox', { name: 'Select a sub-category...' });
    this.overSpeedingOption = page.getByText('Over Speeding');
    this.incidentDateTimeInput = page.getByRole('textbox', { name: 'Incident Date & Time *' });
    this.problemDescriptionInput = page.getByRole('textbox', { name: 'Problem Description *' });
    this.submitGrievanceButton = page.getByRole('button', { name: 'Submit Grievance', exact: true });
    this.viewMyGrievancesButton = page.getByRole('button', { name: 'View My Grievances' });
  }

  // ---- Navigation ----
  async goto() {
    await this.page.goto('https://ajlwebportaldev.amnex.co.in/amts/home');
  }

  // ---- Dynamic locator helpers ----
  routeOptionByName(name: string): Locator {
    return this.page.getByText(name);
  }

  routeDirectionTextByName(name: string): Locator {
    return this.page.getByText(name, { exact: true });
  }

  boardingStopOptionByName(name: string): Locator {
    return this.page.getByRole('option', { name });
  }

  destinationStopOptionByName(name: string): Locator {
    return this.page.getByRole('option', { name });
  }

  categoryOptionByName(name: string): Locator {
    return this.page.getByRole('option', { name });
  }

  otpDigit(index: number): Locator {
    return this.otpInputs.nth(index);
  }

  // ---- Composite actions ----

  /**
   * Logs in via mobile number + OTP.
   * @param mobileNumber - defaults to env var so it's not hardcoded in the test.
   * @param otp - MUST be supplied via env/config in CI; never hardcode a real OTP.
   */
  async login(mobileNumber: string, otp: string) {
    await this.loginRegisterLink.click();
    await this.mobileNumberInput.fill(mobileNumber);
    await this.termsCheckbox.check();
    await this.continueButton.click();

    for (let i = 0; i < otp.length; i++) {
      await this.otpDigit(i).fill(otp[i]);
    }

    await this.loginButton.click();
  }

  async trackRoute(routeText: string, directionText: string) {
    await this.trackRouteTab.click();
    await this.selectRouteCombobox.click();
    await this.routeOptionByName(routeText).click();
    await this.trackRouteButton.click();
    await this.routeDirectionTextByName(directionText).click();
    await this.stopsText.click();
  }

  async searchTimeTable(boardingStop: string, destinationStop: string) {
    await this.trackRouteTab.click();
    await this.timeTableTab.click();
    await this.boardingStopCombobox.click();
    await this.boardingStopOptionByName(boardingStop).click();
    await this.destinationStopCombobox.click();
    await this.destinationStopOptionByName(destinationStop).click();
    await this.searchTimeTableButton.click();
  }

  async submitGrievance(options: {
    category: string;
    subCategory: string;
    incidentDateTime: string;
    description: string;
  }) {
    await this.servicesLink.click();
    await this.grievancesLink.click();
    await this.categoryCombobox.click();
    await this.categoryOptionByName(options.category).click();
    await this.subCategoryCombobox.click();
    await this.page.getByText(options.subCategory).click();
    await this.incidentDateTimeInput.fill(options.incidentDateTime);
    await this.problemDescriptionInput.fill(options.description);
    await this.submitGrievanceButton.click();
    await this.viewMyGrievancesButton.click();
  }
}