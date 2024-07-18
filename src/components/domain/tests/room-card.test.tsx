import { render, screen } from "@testing-library/react";
import RoomCard from "@/components/domain/room-card";

describe("RoomCard", () => {
  const room = {
    id: 1,
    name: "Room 1",
    price: {
      currencyCode: "PLN" as const,
      value: 100,
    },
  };

  it("renders the room name correctly", () => {
    render(<RoomCard room={room} />);
    const roomNameElement = screen.getByRole("heading", {
      name: new RegExp(room.name.trim().toLowerCase(), "i"),
    });
    expect(roomNameElement).toBeInTheDocument();
  });

  it("renders the children correctly", () => {
    render(
      <RoomCard room={room}>
        <div>Child Component</div>
      </RoomCard>
    );
    const childComponent = screen.getByText("Child Component");
    expect(childComponent).toBeInTheDocument();
  });
});
