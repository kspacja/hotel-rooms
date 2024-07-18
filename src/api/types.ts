export type AvailabilityStatus =
  | "available"
  | "onRequest"
  | "soldOut"
  | "error";

export interface Price {
  currencyCode: "CZK" | "EUR" | "PLN"; // TODO: handling more currencies (maybe from external source)
  value: number;
}

export interface Room {
  id: number;
  name: string;
  price: Price;
}

export interface RoomAvailability {
  availabilityStatus: AvailabilityStatus;
  price: Price | null;
}

export interface API {
  "/rooms": Room[];
  [key: `/room/${number}`]: RoomAvailability;
}
