import { Sort } from "@/sorting";

import { Room } from "@/api/types";

// TODO: Taking currency into account would be a good idea.
const sortFunctions: Record<Sort, (a: Room, b: Room) => number> = {
  "price:asc": (a, b) => a.price.value - b.price.value,
  "price:desc": (a, b) => b.price.value - a.price.value,
  "name:asc": (a, b) => a.name.localeCompare(b.name),
  "name:desc": (a, b) => b.name.localeCompare(a.name),
};

export default function sortRooms(rooms: Room[], sort: Sort) {
  return [...rooms].sort(sortFunctions[sort]);
}
