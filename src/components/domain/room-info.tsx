import { Room, AvailabilityStatus, RoomAvailability } from "@/api/types";
import BookButton from "@/components/domain/book-button";
import RoomPrice from "@/components/domain/room-price";

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

export default function RoomInfo({
  room,
  roomAvailability,
}: {
  room: Room;
  roomAvailability: RoomAvailability;
}) {
  return (
    <>
      <RoomPrice
        originalPrice={room.price}
        nextPrice={roomAvailability.price}
      />

      <div className="flex ml-auto items-center gap-4">
        <AvailabilityStatusLabel status={roomAvailability.availabilityStatus} />
        <BookButton room={room} availibility={roomAvailability} />
      </div>
    </>
  );
}
