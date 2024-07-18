import apiFetch from "@/api/apiFetch";
import { Skeleton } from "@/components/ui/skeleton";
import SafeSuspense from "@/components/utilities/safe-suspense";

import { RoomPaginationWrapper, RoomsSortingSelectWrapper } from "./wrappers";

async function AwaitedPagination() {
  const rooms = await apiFetch("/rooms");
  return <RoomPaginationWrapper totalItems={rooms.length} />;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mb-4">
        <RoomsSortingSelectWrapper />
      </div>
      {children}
      <SafeSuspense fallback={<Skeleton className="h-8 w-[100px]" />}>
        <AwaitedPagination />
      </SafeSuspense>
    </>
  );
}
