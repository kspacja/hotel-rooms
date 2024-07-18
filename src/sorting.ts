export const SORT_TYPES = [
  "price:asc",
  "price:desc",
  "name:asc",
  "name:desc",
] as const;

export type Sort = (typeof SORT_TYPES)[number];
