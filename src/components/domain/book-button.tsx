"use client";

import formatPrice from "@/lib/formatPrice";

import { Button } from "@/components/ui/button";

import type { Room, RoomAvailability } from "@/api/types";

export default function BookButton({
  room,

  availibility,
}: {
  room: Room;
  availibility: RoomAvailability;
}) {
  const disabled = availibility.availabilityStatus !== "available";

  return (
    <Button
      onClick={() => {
        console.group(`Booking room ${room.name}`);
        console.log("Room ID:", room.id);
        console.log("Price:", formatPrice(room.price));
        console.log("Availability:", availibility.availabilityStatus);
        if (availibility.price) {
          console.log("next price", formatPrice(availibility.price));
        }
        console.groupEnd();
      }}
      disabled={disabled}
    >
      Book
    </Button>
  );
}
