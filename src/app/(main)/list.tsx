import { notFound } from "next/navigation";

import { Sort } from "@/sorting";

import formatPrice from "@/lib/formatPrice";
import sortRooms from "@/lib/sortRooms";

import { Skeleton } from "@/components/ui/skeleton";
import SafeSuspense from "@/components/utilities/safe-suspense";
import RoomCard from "@/components/domain/room-card";
import RoomAvailabilityStatus from "@/components/domain/room-availability-status";
import BookButton from "@/components/domain/book-button";
import RoomPrice from "@/components/domain/room-price";

import { Room } from "@/api/types";
import apiFetch from "@/api/apiFetch";

async function AwaitedRoomInfo({ room }: { room: Room }) {
  const roomAvailability = await apiFetch(`/room/${room.id}`);

  if (roomAvailability.availabilityStatus === "error") {
    return (
      <p className="text-red-500 pt-1">
        Availability is not known at the moment, please try again later
      </p>
    );
  }

  return (
    <>
      <RoomPrice
        originalPrice={room.price}
        nextPrice={roomAvailability.price}
      />

      <div className="flex ml-auto items-center gap-4">
        <RoomAvailabilityStatus status={roomAvailability.availabilityStatus} />
        <BookButton room={room} availibility={roomAvailability} />
      </div>
    </>
  );
}

export interface RoomListProps {
  pagination: {
    start: number;
    end: number;
  };
  sort: Sort;
}

export default async function RoomList({ pagination, sort }: RoomListProps) {
  const rooms = await apiFetch("/rooms");

  const roomsToDisplay = sortRooms(rooms, sort).slice(
    pagination.start,
    pagination.end
  );

  // When user is on page without rooms, but there are rooms in the system
  if (roomsToDisplay.length === 0 && rooms.length > 0) {
    notFound();
  }

  return (
    <ul>
      {roomsToDisplay.map((room) => (
        <li key={room.id} className="mb-6">
          <RoomCard room={room}>
            <SafeSuspense
              fallback={
                <>
                  <p>Price: {formatPrice(room.price)}</p>
                  <Skeleton className="h-9 w-[250px] ml-auto" />
                </>
              }
            >
              <AwaitedRoomInfo room={room} />
            </SafeSuspense>
          </RoomCard>
        </li>
      ))}
      {roomsToDisplay.length === 0 && (
        <li>
          <p role="alert" aria-live="polite" className="text-center">
            No rooms found
          </p>
        </li>
      )}
    </ul>
  );
}
