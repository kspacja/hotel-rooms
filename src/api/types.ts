export interface Price {
  currencyCode: "CZK" | "EUR" | "PLN";
  value: number;
}

export interface Room {
  id: number;
  name: string;
  price: Price;
}

export interface RoomAvailability {
  availabilityStatus: "available" | "onRequest" | "soldout" | "error";
  price: Price | null;
}

export interface API {
  "/rooms": Room[];
  [key: `/room/${number}`]: RoomAvailability;
}
