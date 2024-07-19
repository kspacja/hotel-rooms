import formatPrice from "@/lib/formatPrice";
import arePricesEqual from "@/lib/arePricesEqual";

import type { Price } from "@/api/types";

export default function RoomPrice({
  nextPrice,
  originalPrice,
}: {
  nextPrice: Price | null;
  originalPrice: Price;
}) {
  const price = nextPrice ?? originalPrice;

  return (
    <div>
      Price:{" "}
      {!arePricesEqual(price, originalPrice) && (
        <s aria-label="original price" className="text-slate-500">
          {formatPrice(originalPrice)}
        </s>
      )}{" "}
      <span aria-label="current price">{formatPrice(price)} </span>
    </div>
  );
}
