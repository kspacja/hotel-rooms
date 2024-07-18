import apiFetch from "@/api/apiFetch";
import { Room } from "@/api/types";
import formatPrice from "@/lib/formatPrice";
import { Skeleton } from "@/components/ui/skeleton";

import SafeSuspense from "@/components/utilities/safe-suspense";
import RoomCard from "@/components/domain/room-card";
import RoomInfo from "@/components/domain/room-info";
import sortRooms from "@/lib/sortRooms";
import { Sort } from "@/sorting";
import { notFound } from "next/navigation";

async function AwaitedRoomAvailability({ room }: { room: Room }) {
  const roomAvailability = await apiFetch(`/room/${room.id}`);

  if (roomAvailability.availabilityStatus === "error") {
    throw new Error("Availability error");
  }

  return <RoomInfo room={room} roomAvailability={roomAvailability} />;
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
              <AwaitedRoomAvailability room={room} />
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
