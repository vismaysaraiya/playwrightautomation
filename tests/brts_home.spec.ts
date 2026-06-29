import { test, expect } from '@playwright/test';
import { link } from 'node:fs';
import { beforeEach } from 'node:test';

test.describe('verify all required content',()=>{
  test.beforeEach(async({page})=>{

  await page.goto('https://ajlwebportaldev.amnex.co.in/amts/home/');
  //await page.waitForLoadState('domcontentloaded');

  
  })

  test('Page should have these content', async ({ page }) => {
    
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('Home | AMTS - Ahmedabad Municipal Transport Service');
    await expect (page.getByRole('heading', { name: 'AMTS Online Service ' })).toBeVisible();
    await expect (page.getByRole('heading', { name: 'What\'s New' })).toBeVisible();
    await expect (page.getByRole('tab', { name: ' Time Table' })).toBeVisible();
    await expect (page.getByRole('tab', { name: ' Track Route' })).toBeVisible();
    await expect (page.getByRole('heading', { name: 'Moving Ahmedabad, every' })).toBeVisible();
    await expect (page.getByRole('link', { name: 'About Us' })).toBeVisible();
    await expect (page.getByRole('link', { name: 'Circulars' })).toBeVisible();
    await expect (page.getByRole('link', { name: 'Gallery' })).toBeVisible();
    await expect (page.getByRole('link', { name: 'Faq\'s' })).toBeVisible();
    await expect (page.getByRole('link', { name: 'Explore' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Moving Ahmedabad, every single day' })).toBeVisible();
    
  });

  test('Track Route', async({page})=>{
    await page.getByRole('tab',{name : 'Track Route'}).click()
    await page.getByRole('combobox', { name: 'Select a route' }).click();
    await page.getByText('102-D — Akshardham Mandir (').click();
    
    await page.getByRole('button', { name: ' Track Route' }).click();
    await page.getByText('Akshardham Mandir (Gandhinagar) → Maninagar', { exact: true }).click();
    await page.getByText('Stops').click();
    await expect (page.getByRole('tab', { name: 'Lal Darwaja' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Akshardham Mandir (' })).toBeVisible();
  });

  test('Timetabel', async({page})=>{
    
    await page.getByRole('tab', { name: ' Track Route' }).click();
    await page.getByRole('tab', { name: ' Time Table' }).click();
    await page.getByRole('combobox', { name: 'Select boarding stop' }).click();
    
    await page.getByRole('option', { name: 'Aamba Talav' }).click();
    await page.getByRole('combobox', { name: 'Select destination stop' }).click();
    await page.getByRole('option', { name: 'Aanjna Chowk' }).click();
    await page.getByRole('button', { name: ' Search Time Table' }).click();
    // await expect(page.getByText('No routes found between Aamba')).toBeVisible();
    // await page.getByRole('button', { name: 'Swap stations' }).click();
 
  });
  
  test('Verify Gravience', async({page})=>{
  await page.getByRole('link', { name: ' Login / Register' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number*' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number*' }).fill('9099590779');
  await page.getByRole('checkbox', { name: 'By continuing you agree to' }).check();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill('1');
  await page.getByRole('textbox').nth(1).fill('2');
  await page.getByRole('textbox').nth(2).fill('3');
  await page.getByRole('textbox').nth(3).fill('4');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('Services').first().click();
  await page.getByRole('link', { name: 'Grievances', exact: true }).click();
  await page.getByRole('combobox', { name: 'Select a category...' }).click();
  await page.getByRole('option', { name: 'Driver' }).click();
  await page.getByRole('combobox', { name: 'Select a sub-category...' }).click();
  await page.getByText('Over Speeding').click();
  await page.getByRole('textbox', { name: 'Incident Date & Time *' }).fill('2026-06-29T17:50');
  await page.getByRole('textbox', { name: 'Problem Description *' }).click();
  await page.getByRole('textbox', { name: 'Problem Description *' }).fill('test grievances');
  await page.getByRole('button', { name: 'Submit Grievance', exact: true }).click();
  await page.getByRole('button', { name: ' View My Grievances' }).click();
  await page.getByText('Over Speeding').first()  

});

})