import type { Price } from "@/api/types";

export default function formatPrice(price: Price) {
  // TODO: Use sth instead of `undefined` to get the user's locale
  return price.value.toLocaleString(undefined, {
    currency: price.currencyCode,
    style: "currency",
  });
}
