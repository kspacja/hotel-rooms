import type { Price } from "@/api/types";

export default function formatPrice(price: Price, locale = "en-US") {
  return price.value.toLocaleString(locale, {
    currency: price.currencyCode,
    style: "currency",
  });
}
