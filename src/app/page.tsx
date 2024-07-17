import apiFetch from "@/api/apiFetch";
import type { Price, Room } from "@/api/types";
import { Suspense } from "react";
import BookButton from "./book-button";

function formatPrice(price: Price) {
  return Intl.NumberFormat(undefined, {
    style: "currency",
    currency: price.currencyCode,
  }).format(price.value);
}

function arePricesEqual(priceA: Price, priceB: Price) {
  return (
    priceA.currencyCode === priceB.currencyCode && priceA.value === priceB.value
  );
}

async function AvailabilityChecker({ room }: { room: Room }) {
  const { id: roomId, price: originalPrice } = room;

  const roomAvailability = await apiFetch(`/room/${roomId}`);

  const price = roomAvailability.price ?? originalPrice;

  const isAvailable = roomAvailability.availabilityStatus === "available";

  return (
    <>
      <p>
        Price: {formatPrice(price)}{" "}
        {!arePricesEqual(price, originalPrice) && (
          <s>{formatPrice(originalPrice)}</s>
        )}
      </p>
      <p>Availability: {roomAvailability.availabilityStatus}</p>
      <BookButton
        room={room}
        disabled={!isAvailable}
        availibility={roomAvailability}
      />
    </>
  );
}

function RoomCmp({ room }: { room: Room }) {
  return (
    <div>
      <h2>{room.name}</h2>

      <Suspense
        fallback={
          <>
            <p>Price: {formatPrice(room.price)}</p>
            <p>Checking availability...</p>
          </>
        }
      >
        <AvailabilityChecker room={room} />
      </Suspense>
    </div>
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
      <h1>Hotel</h1>
      <p>Welcome to our hotel!</p>
      <ul>
        {rooms.slice(start, end).map((room) => (
          <li key={room.id}>
            <RoomCmp room={room} />
          </li>
        ))}
      </ul>
      <div>{total} rooms</div>
    </main>
  );
}
