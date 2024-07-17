import { Suspense } from "react";
import RoomList from "./list";
import Loading from "./list-loading";

import { Skeleton } from "@/components/ui/skeleton";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    page?: string;
    pageSize?: string;
    sort?: "price:asc" | "price:desc" | "name:asc" | "name:desc";
  };
}) {
  const { page = "1", pageSize = "4", sort = "price:asc" } = searchParams;

  // zoding params?

  const pageSizeParsed = Number(pageSize);
  const pageParsed = Number(page);

  const start = (pageParsed - 1) * pageSizeParsed;
  const end = start + pageSizeParsed;

  // sorting by price or name (asc/desc)

  // Custom Suspense because of this issue: https://github.com/vercel/next.js/issues/49297
  return (
    <Suspense key={JSON.stringify(searchParams)} fallback={<Loading />}>
      <RoomList start={start} end={end} sort={sort} />
    </Suspense>
  );
}
