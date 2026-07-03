import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { mobileNumber, otp } from '../test-data/loginData';

test.describe('AMTS Home - verify all required content', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('Home page should have all required content', async ({ page }) => {
    await expect(page).toHaveTitle('Home | AMTS - Ahmedabad Municipal Transport Service');
    await expect(homePage.onlineServiceHeading).toBeVisible();
    await expect(homePage.whatsNewHeading).toBeVisible();
    await expect(homePage.timeTableTab).toBeVisible();
    await expect(homePage.trackRouteTab).toBeVisible();
    await expect(homePage.movingAhmedabadHeading).toBeVisible();
    await expect(homePage.aboutUsLink).toBeVisible();
    await expect(homePage.circularsLink).toBeVisible();
    await expect(homePage.galleryLink).toBeVisible();
    await expect(homePage.faqsLink).toBeVisible();
    await expect(homePage.exploreLink).toBeVisible();
    await expect(homePage.movingAhmedabadFullHeading).toBeVisible();
  });

  test('Track Route should show stops for the selected route', async () => {
    await homePage.trackRoute(
      '102-D — Akshardham Mandir (',
      'Akshardham Mandir (Gandhinagar) → Maninagar'
    );

    await expect(homePage.lalDarwajaTab).toBeVisible();
    await expect(homePage.akshardhamMandirTab).toBeVisible();
  });

  test('Timetable search should return available routes', async () => {
    await homePage.searchTimeTable('Aamba Talav', 'Aanjna Chowk');

    await expect(homePage.availableRoutesText).toBeVisible();
  });


  test('Grievance submission should appear in My Grievances', async ({ page }) => {
    await homePage.login(mobileNumber, otp);
    await page.waitForURL(/amts\/home/); // ensure login redirect completes before proceeding

    await homePage.submitGrievance({
      category: 'Driver',
      subCategory: 'Over Speeding',
      incidentDateTime: '2026-06-29T17:50',
      description: 'test grievances',
    });

    await expect(homePage.overSpeedingOption.first()).toBeVisible();
  });
});
