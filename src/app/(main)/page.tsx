import { Suspense } from "react";
import RoomList from "./list";
import Loading from "./list-loading";

import searchParamsParse from "@/lib/searchParamsParse";
import { redirect, RedirectType } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    page?: string;
    pageSize?: string;
    sort?: string;
  };
}) {
  const parsedParams = searchParamsParse(searchParams);

  if (!parsedParams.success) {
    redirect("/", RedirectType.replace);
  }

  const { page, pageSize, sort } = parsedParams.data;

  // TODO: Move to helper
  const pageSizeParsed = Number(pageSize);
  const pageParsed = Number(page);

  const start = (pageParsed - 1) * pageSizeParsed;
  const end = start + pageSizeParsed;

  // Custom Suspense because of this issue: https://github.com/vercel/next.js/issues/49297
  return (
    <Suspense key={JSON.stringify(searchParams)} fallback={<Loading />}>
      <RoomList start={start} end={end} sort={sort} />
    </Suspense>
  );
}
