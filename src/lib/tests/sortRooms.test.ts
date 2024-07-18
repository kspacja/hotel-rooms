import sortRooms from "../sortRooms";
import { Room } from "@/api/types";

const rooms: Room[] = [
  { id: 1, name: "Room A", price: { value: 100, currencyCode: "CZK" } },
  { id: 2, name: "Room B", price: { value: 200, currencyCode: "CZK" } },
  { id: 3, name: "Room C", price: { value: 150, currencyCode: "CZK" } },
];

describe("sortRooms", () => {
  it.each([
    ["price:asc", [rooms[0], rooms[2], rooms[1]]],
    ["price:desc", [rooms[1], rooms[2], rooms[0]]],
    ["name:asc", [rooms[0], rooms[1], rooms[2]]],
    ["name:desc", [rooms[2], rooms[1], rooms[0]]],
  ] as const)("sorts rooms by %p", (sort, expected) => {
    const sortedRooms = sortRooms(rooms, sort);
    expect(sortedRooms).toStrictEqual(expected);
  });
});
