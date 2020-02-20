import homePageModel from "./page_models/home_page_model";

fixture("Cash Conversion App").page("http://localhost:3000/");

test("User can convert between two currencies", async t => {
  await t
    .typeText(homePageModel.baseAmountInput, "100")
    .click(homePageModel.fromCurrencySelect)
    .click(homePageModel.fromCurrencyOptions.withText("Euro"))
    .click(homePageModel.toCurrencySelect)
    .click(homePageModel.toCurrencyOptions.withText("Japanese Yen"))
    .click(homePageModel.convertButton);

  await t.expect(homePageModel.conversionResponse.exists).ok();
  await t
    .expect(homePageModel.conversionResponse.innerText)
    .eql("100 Euro is about 11910.35 Japanese Yen");
});
