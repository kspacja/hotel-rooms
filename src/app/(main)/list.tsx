import apiFetch from "@/api/apiFetch";
import { AvailabilityStatus, Price, Room } from "@/api/types";
import { Suspense } from "react";
import BookButton from "@/components/book-button";
import { formatPrice } from "@/lib/formatPrice";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/error-boundary";

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
    <Card className="min-h-[95px]">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start sm:items-center sm:flex-row gap-2">
        <ErrorBoundary
          fallback={
            <p className="text-red-500">
              Something goes wrong, try again later
            </p>
          }
        >
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

export interface RoomListProps {
  start: number;
  end: number;
  sort: "price:asc" | "price:desc" | "name:asc" | "name:desc";
}

const sortFunctions: Record<
  RoomListProps["sort"],
  (a: Room, b: Room) => number
> = {
  "price:asc": (a, b) => a.price.value - b.price.value,
  "price:desc": (a, b) => b.price.value - a.price.value,
  "name:asc": (a, b) => a.name.localeCompare(b.name),
  "name:desc": (a, b) => b.name.localeCompare(a.name),
};

export default async function RoomList({ start, end, sort }: RoomListProps) {
  const rooms = await apiFetch("/rooms");

  const sortedRooms = [...rooms].sort(sortFunctions[sort]);

  const slicedRooms = sortedRooms.slice(start, end);

  return (
    <ul>
      {slicedRooms.map((room) => (
        <li key={room.id} className="mb-6">
          <RoomCmp room={room} />
        </li>
      ))}
      {slicedRooms.length === 0 && (
        <li>
          <p role="alert" aria-live="polite" className="text-center">
            No rooms found
          </p>
        </li>
      )}
    </ul>
  );
}
