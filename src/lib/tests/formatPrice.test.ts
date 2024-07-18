import { Price } from "@/api/types";

import formatPrice from "../formatPrice";

const priceA: Price = { currencyCode: "EUR", value: 10 };
const priceB: Price = { currencyCode: "PLN", value: 10 };

describe("formatPrice", () => {
  it.each([
    [priceA, expect.stringContaining("€")],
    [priceB, expect.stringContaining("PLN")],
  ])("%p => %p", (price, expected) => {
    expect(formatPrice(price)).toEqual(expected);
  });

  // it("should format taking into consideration diffrent currency", () => {
  //   expect(formatPrice(priceA)).to();
  //   expect(formatPrice(priceB)).toBe("PLN10");
  // });
});
