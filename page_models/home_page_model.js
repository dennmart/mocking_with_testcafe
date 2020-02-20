import { Selector } from "testcafe";

class HomePageModel {
  constructor() {
    this.baseAmountInput = Selector("#base_amount");

    this.fromCurrencySelect = Selector("#from_currency");
    this.fromCurrencyOptions = this.fromCurrencySelect.find("option");

    this.toCurrencySelect = Selector("#to_currency");
    this.toCurrencyOptions = this.toCurrencySelect.find("option");

    this.convertButton = Selector("#convert_btn");

    this.conversionResponse = Selector(".conversion-response");
  }
}

export default new HomePageModel();
