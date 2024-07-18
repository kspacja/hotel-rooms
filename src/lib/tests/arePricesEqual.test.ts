import arePricesEqual from "@/lib/arePricesEqual";

import { Price } from "@/api/types";

const priceA: Price = { currencyCode: "EUR", value: 10 };
const priceB: Price = { currencyCode: "EUR", value: 10 };
const priceC: Price = { currencyCode: "PLN", value: 10 };
const priceD: Price = { currencyCode: "EUR", value: 20 };
const priceE: Price = { currencyCode: "PLN", value: 20 };

describe("arePricesEqual", () => {
  it.each([
    [priceA, priceB, true],
    [priceB, priceA, true], // symetric
    [priceA, priceC, false], // different currency
    [priceA, priceD, false], // different value
    [priceA, priceE, false], // different currency and value
  ])("%p === %p => %p", (pA, pB, expected) => {
    expect(arePricesEqual(pA, pB)).toBe(expected);
  });
});
