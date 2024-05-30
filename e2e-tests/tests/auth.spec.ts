import { test, expect } from '@playwright/test';

const ui_url = "http://localhost:5173/";
test('should allow the user to login', async ({ page }) => {
await page.goto(ui_url);
await page.getByRole("link" , {name :"Login"}).click();
await expect(page.getByRole("heading" , {name :"Login"})).toBeVisible();
await page.locator("[name=email]").fill("user1444@gmail.com");
await page.locator("[name=password]").fill("password");
await page.getByRole("button" , {name :"Login"}).click();
await expect(page.getByText("login success")).toBeVisible();
await expect(page.getByRole("link" , {name : "My Booking"})).toBeVisible();
await expect(page.getByRole("link" , {name : "My Hotels"})).toBeVisible();
await expect(page.getByRole("button" , {name : "Logout"})).toBeVisible();

});



test('should allow the user to register', async ({ page }) => {
  const randomEmail = `test_email${Math.floor(Math.random() * 9000) + 10000}@gmail.com`
  await page.goto(ui_url);
  await page.getByRole("link" , {name :"Register"}).click();
  await expect(page.getByRole("heading" , {name :"Register"})).toBeVisible();
  await page.locator("[name=firstName]").fill("user1444");
  await page.locator("[name=lastName]").fill("user1444");
  await page.locator("[name=email]").fill(randomEmail);
  await page.locator("[name=password]").fill("password");
  await page.locator("[name=confirmPassword]").fill("password");
  await page.getByRole("button" , {name :"Create Account"}).click();
  await expect(page.getByText("Registration successful")).toBeVisible();
  await expect(page.getByRole("link" , {name : "My Booking"})).toBeVisible();
  await expect(page.getByRole("link" , {name : "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button" , {name : "Logout"})).toBeVisible();
  
  });
  
  