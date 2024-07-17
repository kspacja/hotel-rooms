import apiFetch from "@/api/apiFetch";
import ItemsPagination from "@/components/items-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import SortingSelect from "@/components/sorting-select";

async function AwaitedPagination() {
  const rooms = await apiFetch("/rooms");
  return <ItemsPagination totalItems={rooms.length} />;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mb-4">
        <SortingSelect />
      </div>
      {children}
      <Suspense fallback={<Skeleton className="h-8 w-[100px]" />}>
        <AwaitedPagination />
      </Suspense>
    </>
  );
}
