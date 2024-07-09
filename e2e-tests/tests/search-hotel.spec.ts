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


test("should book hotel" , async ({page}) => {
  await page.goto(ui_url);
  await page.getByPlaceholder("where are you going?").fill("dublin");

  const date = new Date();
  date.setDate(date.getDate() + 3 );
  const formattedDate = date.toISOString().split("T")[0];
  await page.getByPlaceholder("Check-out date").fill(formattedDate);
  await page.getByRole("button" , {name : "Search"}).click();
  await page.getByText("hotel-2 dublin").click();
  await page.getByRole("button" , {name : "Book Now"}).click();
  await expect(page.getByText("Total Cost : $ 88.00")).toBeVisible();
  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame.locator('[placeholder="Card number"]').fill("4242424242424242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
  await stripeFrame.locator('[placeholder="CVC"]').fill("242");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("24225");
  await page.getByRole("button" , {name : "Confirm Booking"}).click();
  await expect(page.getByText("Booking Saved")).toBeVisible();
  await page.getByRole("link" , {name : "My Booking"}).click();
  await expect(page.getByText("hotel-2 dublin")).toBeVisible();
});