import test, { expect } from "@playwright/test";


const ui_url = "http://localhost:5173/";
test.beforeEach(async({page}) => {
  await page.goto(ui_url);
  await page.getByRole("link" , {name :"Login"}).click();
  await expect(page.getByRole("heading" , {name :"Login"})).toBeVisible();
  await page.locator("[name=email]").fill("user1444@gmail.com");
  await page.locator("[name=password]").fill("password");
  await page.getByRole("button" , {name :"Login"}).click();
  await expect(page.getByText("login success")).toBeVisible();
})

test("should show hotel search results" , async ({page}) => {
await page.goto(ui_url);
await page.getByPlaceholder("where are you going?").fill("dublin");
await page.getByRole("button" , {name : "Search"}).click();
await expect(page.getByText("hotel-2 dublin")).toBeVisible();
});

test("should show the details page" , async ({page}) => {
  await page.goto(ui_url);
await page.getByPlaceholder("where are you going?").fill("dublin");
await page.getByRole("button" , {name : "Search"}).click();
await page.getByText("hotel-2 dublin").click();
await expect(page).toHaveURL(/details/);
await expect(page.getByText("hotel-2 dublin")).toBeVisible();
await expect(page.getByRole("button" , {name : "Book Now"})).toBeVisible();
});