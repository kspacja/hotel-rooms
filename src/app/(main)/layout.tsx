import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import SafeSuspense from "@/components/utilities/safe-suspense";

import { RoomPaginationWrapper, RoomsSortingSelectWrapper } from "./wrappers";

import apiFetch from "@/api/apiFetch";


async function AwaitedPagination() {
  const rooms = await apiFetch("/rooms");
  return <RoomPaginationWrapper totalItems={rooms.length} />;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mb-4">
        <Suspense fallback={<Skeleton className="h-[32px] w-[250px]" />}>
          <RoomsSortingSelectWrapper />
        </Suspense>
      </div>
      {children}
      <SafeSuspense fallback={<Skeleton className="h-8 w-[100px]" />}>
        <AwaitedPagination />
      </SafeSuspense>
    </>
  );
}
