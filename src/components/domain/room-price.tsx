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
      Price: {formatPrice(price)}{" "}
      {!arePricesEqual(price, originalPrice) && (
        <s className="text-slate-400">{formatPrice(originalPrice)}</s>
      )}
    </div>
  );
}
