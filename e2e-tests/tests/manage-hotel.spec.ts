import path from "path";
import test, { _android, expect } from "@playwright/test";


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

test("should allow users to add a hotel" , async({ page }) => {
  await page.goto(`${ui_url}add-hotel`);
  await expect(page.getByRole("heading" , {name : "Add Hotel"})).toBeVisible();
  await page.locator("[name=name]").fill("hotelName");
  await page.locator("[name=city]").fill("hotelcity");
  await page.locator("[name=country]").fill("hotelcountry");
  await page.locator("[name=description]").fill("hoteldescription description description");
  // await page.locator("[name=type]").fill("hoteltype");
  await page.locator("[name=pricePerNight]").fill("120");
  await page.selectOption("select[name=starRating]" , "3");
  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name=childCount]").fill("3");
  await page.getByText("Budget").click();
  await page.getByLabel("Free WiFi").check();
  await page.getByLabel("Parking").check();

  await page.setInputFiles("[name=imageUrls]" , [
    path.join(__dirname , "files" , "1.jpg"),
    path.join(__dirname , "files" , "2.jpg"),
  ])
await page.getByRole("button" , {name : "Save"}).click();
await expect(page.getByText("Hotel saved")).toBeVisible();
})


test("should display hotels" , async({page}) => {
  await page.goto(`${ui_url}my-hotels`);
  await expect(page.getByText("hotelName").first()).toBeVisible();
  await expect(page.getByText("hoteldescription")).toBeVisible();
  await expect(page.getByText("hotelcity , hotelcountry")).toBeVisible();
  await expect(page.getByText("Budget")).toBeVisible();
  await expect(page.getByText("$120 per night")).toBeVisible();
  await expect(page.getByText("2 adult , 3 children")).toBeVisible();
  await expect(page.getByText("3 star rating")).toBeVisible();

  await expect(page.getByRole("link" , {name : "View Details"}).first()).toBeVisible();
  await expect(page.getByRole("link" , {name : "Add hotel"})).toBeVisible();
})

test("should edit hotel" , async({page}) => {
await page.goto(`${ui_url}my-hotels`);
await page.getByRole("link" , {name : "View Details"}).first().click();
await page.waitForSelector("[name=name]" , {state : "attached"});
await expect(page.locator("[name=name]")).toHaveValue("hotelName");
await page.locator("[name=name]").fill("updated - hotelName ---");
await page.getByRole("button" , {name : "Save"}).click();
await expect(page.getByText("updated Hotel saved")).toBeVisible();
await page.reload();
await expect(page.locator("[name=name]")).toHaveValue("updated - hotelName ---");
await page.locator("[name=name]").fill("hotelName");
await page.getByRole("button" , {name : "Save"}).click();
})