import { SORT_TYPES } from "@/sorting";
import { z } from "zod";

const sortSchema = z.enum(SORT_TYPES).default("price:asc");

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(4).default(4),
  sort: sortSchema,
});

export type SearchParams = z.infer<typeof searchParamsSchema>;

export default function searchParamsParse(
  searchParams: Record<string, string>
) {
  return searchParamsSchema.safeParse(searchParams);
}
