import { AvailabilityStatus } from "@/api/types";

const STATUS_LABELS: Record<AvailabilityStatus, string> = {
  available: "Available",
  onRequest: "On request",
  soldOut: "Sold out",
  error: "Error",
};

export default function RoomAvailabilityStatus({
  status,
}: {
  status: AvailabilityStatus;
}) {
  return (
    <p className="text-sm">
      <span className="font-semibold">Availability:</span>{" "}
      {STATUS_LABELS[status]}
    </p>
  );
}
