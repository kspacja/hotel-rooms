import apiFetch from "@/api/apiFetch";
import type {
  AvailabilityStatus,
  Price,
  Room,
  RoomAvailability,
} from "@/api/types";
import { Suspense } from "react";
import BookButton from "../book-button";
import { formatPrice } from "../../lib/formatPrice";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/app/error-boundary";

function arePricesEqual(priceA: Price, priceB: Price) {
  return (
    priceA.currencyCode === priceB.currencyCode && priceA.value === priceB.value
  );
}

const STATUS_LABELS: Record<AvailabilityStatus, string> = {
  available: "Available",
  onRequest: "On request",
  soldOut: "Sold out",
  error: "Error",
};

function AvailabilityStatusLabel({ status }: { status: AvailabilityStatus }) {
  return (
    <p className="text-sm">
      <span className="font-semibold">Availability:</span>{" "}
      {STATUS_LABELS[status]}
    </p>
  );
}

async function AvailabilityChecker({ room }: { room: Room }) {
  const { id: roomId, price: originalPrice } = room;

  const roomAvailability = await apiFetch(`/room/${roomId}`);

  const price = roomAvailability.price ?? originalPrice;
  const isAvailable = roomAvailability.availabilityStatus === "available";

  if (roomAvailability.availabilityStatus === "error") {
    throw new Error("Availability error");
  }

  return (
    <>
      <p>
        Price: {formatPrice(price)}{" "}
        {!arePricesEqual(price, originalPrice) && (
          <s className="text-slate-400">{formatPrice(originalPrice)}</s>
        )}
      </p>
      <div className="flex ml-auto items-center gap-4">
        <AvailabilityStatusLabel status={roomAvailability.availabilityStatus} />
        <BookButton
          room={room}
          disabled={!isAvailable}
          availibility={roomAvailability}
        />
      </div>
    </>
  );
}

function RoomCmp({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start sm:items-center sm:flex-row gap-2">
        <ErrorBoundary fallback={<p>Something goes wrong, try again later</p>}>
          <Suspense
            fallback={
              <>
                <p>Price: {formatPrice(room.price)}</p>
                <Skeleton className="h-9 w-[250px] ml-auto" />
              </>
            }
          >
            <AvailabilityChecker room={room} />
          </Suspense>
        </ErrorBoundary>
      </CardFooter>
    </Card>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string; pageSize?: string };
}) {
  const rooms = await apiFetch("/rooms");

  const { page = "1", pageSize = "4" } = searchParams;

  // zoding params?

  const pageSizeParsed = Number(pageSize);
  const start = (Number(page) - 1) * pageSizeParsed;
  const end = start + pageSizeParsed;
  const total = rooms.length;

  // pagination handling
  // sorting by price or name (asc/desc)

  return (
    <main>
      <ul>
        {rooms.slice(start, end).map((room) => (
          <li key={room.id} className="mb-6">
            <RoomCmp room={room} />
          </li>
        ))}
      </ul>
      <div>{total} rooms</div>
    </main>
  );
}
