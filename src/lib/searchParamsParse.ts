import { z } from "zod";

import { SORT_TYPES, DEFAULT_SORT } from "@/sorting";

const sortSchema = z.enum(SORT_TYPES).default(DEFAULT_SORT);

export const DEFAULT_PARAMS = {
  page: 1,
  pageSize: 4,
  sort: DEFAULT_SORT,
};

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().default(DEFAULT_PARAMS.page),
  pageSize: z.coerce
    .number()
    .int()
    .positive()
    .max(4)
    .default(DEFAULT_PARAMS.pageSize),
  sort: sortSchema,
});

export type SearchParams = z.infer<typeof searchParamsSchema>;

export default function searchParamsParse(
  searchParams: Record<string, string>
) {
  return searchParamsSchema.safeParse(searchParams);
}
