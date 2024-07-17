import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";

const sortSchema = z
  .enum(["price:asc", "price:desc", "name:asc", "name:desc"])
  .default("price:asc");

export type Sort = z.infer<typeof sortSchema>;

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
