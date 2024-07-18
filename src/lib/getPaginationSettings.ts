import { z } from "zod";

const parametersSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
});

export default function getPaginationSettings(page: number, pageSize: number) {
  parametersSchema.parse({ page, pageSize });

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    start,
    end,
  };
}
