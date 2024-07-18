import { Price } from "@/api/types";

export default function arePricesEqual(priceA: Price, priceB: Price) {
  return (
    priceA.currencyCode === priceB.currencyCode && priceA.value === priceB.value
  );
}
