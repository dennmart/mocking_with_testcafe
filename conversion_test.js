import { RequestMock } from "testcafe";
import homePageModel from "./page_models/home_page_model";

fixture("Cash Conversion App").page("http://localhost:3000/");

const conversionMock = RequestMock()
  .onRequestTo("http://localhost:3001/exchange_rates/convert")
  .respond(
    {
      baseAmount: "100",
      conversion: "11910.35",
      fromCurrency: "Euro",
      toCurrency: "Japanese Yen"
    },
    200,
    { "Access-Control-Allow-Origin": "http://localhost:3000" }
  );

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
