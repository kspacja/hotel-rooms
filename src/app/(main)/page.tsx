import { Suspense } from "react";
import RoomList from "./list";
import Loading from "./list-loading";

import searchParamsParse from "@/lib/searchParamsParse";
import { redirect, RedirectType } from "next/navigation";
import getPaginationSettings from "@/lib/getPaginationSettings";

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

  // Custom Suspense because of this issue: https://github.com/vercel/next.js/issues/49297
  return (
    <Suspense key={JSON.stringify(parsedParams.data)} fallback={<Loading />}>
      <RoomList
        pagination={getPaginationSettings(page, pageSize)}
        sort={sort}
      />
    </Suspense>
  );
}
