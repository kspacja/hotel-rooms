export const DEFAULT_SORT = "price:asc" as const;

export const SORT_TYPES = [
  DEFAULT_SORT,
  "price:desc",
  "name:asc",
  "name:desc",
] as const;

export type Sort = (typeof SORT_TYPES)[number];
