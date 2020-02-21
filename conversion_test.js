import { RequestMock } from "testcafe";
import homePageModel from "./page_models/home_page_model";

fixture("Cash Conversion App").page("https://cash-conversion.dev-tester.com/");

const conversionMock = RequestMock()
  .onRequestTo("https://cash-conversion-api.dev-tester.com/exchange_rates/convert")
  .respond(
    {
      baseAmount: "100",
      conversion: "11910.35",
      fromCurrency: "Euro",
      toCurrency: "Japanese Yen"
    },
    200,
    { "Access-Control-Allow-Origin": "https://cash-conversion.dev-tester.com" }
  );

const errorMock = RequestMock()
  .onRequestTo("https://cash-conversion-api.dev-tester.com/exchange_rates/convert")
  .respond("", 422, {
    "Access-Control-Allow-Origin": "https://cash-conversion.dev-tester.com"
  });

test.requestHooks(conversionMock)(
  "User can convert between two currencies",
  async t => {
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
  }
);

test.requestHooks(errorMock)(
  "User sees an error message if the API request has a non-success response",
  async t => {
    await t
      .typeText(homePageModel.baseAmountInput, "100")
      .click(homePageModel.fromCurrencySelect)
      .click(homePageModel.fromCurrencyOptions.withText("Euro"))
      .click(homePageModel.toCurrencySelect)
      .click(homePageModel.toCurrencyOptions.withText("Japanese Yen"))
      .click(homePageModel.convertButton);

    await t.expect(homePageModel.errorResponse.exists).ok();
    await t
      .expect(homePageModel.errorResponse.innerText)
      .eql("There was an error performing the conversion. Please try again.");
  }
);
