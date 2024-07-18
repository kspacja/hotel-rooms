import { render, screen } from "@testing-library/react";

import RoomAvailabilityStatus from "@/components/domain/room-availability-status";

describe("RoomAvailabilityStatus", () => {
  it("renders diffrent statuses", () => {
    const { rerender } = render(<RoomAvailabilityStatus status="available" />);
    screen.getByText(/Availability:/i);

    const value = screen.getByText(/Available/i);
    expect(value).toBeInTheDocument();

    rerender(<RoomAvailabilityStatus status="onRequest" />);

    const nextValue = screen.getByText(/On request/i);
    expect(nextValue).toBeInTheDocument();
  });
});
