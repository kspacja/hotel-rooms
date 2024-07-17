"use client";

import type { Room, RoomAvailability } from "@/api/types";

export default function BookButton({
  room,
  disabled,
  availibility,
}: {
  room: Room;
  availibility: RoomAvailability;
  disabled: boolean;
}) {
  return (
    <button
      className="border rounded px-2 py-1"
      onClick={() => {
        console.group(`Booking room ${room.name}`);
        console.log("Room ID:", room.id);
        console.log("Price:", room.price);
        console.log("Availability:", availibility.availabilityStatus);
        console.log("next price", availibility.price);
        console.groupEnd();
      }}
      disabled={disabled}
    >
      Book
    </button>
  );
}
