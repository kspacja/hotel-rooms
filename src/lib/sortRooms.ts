import { Sort } from "@/sorting";

import { Room } from "@/api/types";

// Assumition that prices are always with the same currency
const sortFunctions: Record<Sort, (a: Room, b: Room) => number> = {
  "price:asc": (a, b) => a.price.value - b.price.value,
  "price:desc": (a, b) => b.price.value - a.price.value,
  "name:asc": (a, b) => a.name.localeCompare(b.name),
  "name:desc": (a, b) => b.name.localeCompare(a.name),
};

export default function sortRooms(rooms: Room[], sort: Sort) {
  return [...rooms].sort(sortFunctions[sort]);
}
