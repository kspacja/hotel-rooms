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
      Price: <span aria-label="current price">{formatPrice(price)} </span>
      {!arePricesEqual(price, originalPrice) && (
        <s aria-label="original price" className="text-slate-400">
          {formatPrice(originalPrice)}
        </s>
      )}
    </div>
  );
}
