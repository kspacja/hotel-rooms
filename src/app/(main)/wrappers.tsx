"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SortingSelect from "@/components/common/sorting-select";
import useParsedSearchParams from "@/lib/useParsedSearchParams";
import ItemsPagination, {
  ItemsPaginationProps,
} from "@/components/common/items-pagination";

export function RoomsSortingSelectWrapper() {
  const { push } = useRouter();
  const searchParams = useParsedSearchParams();

  return (
    <SortingSelect
      sorting={searchParams.sort}
      onSortChange={(sort) => {
        const newSearchParams = new URLSearchParams();
        newSearchParams.set("sort", sort);

        push(`?${newSearchParams.toString()}`);
      }}
    />
  );
}

function useGetPageURL() {
  const searchParams = useSearchParams();

  return (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", String(page));

    return `?${newSearchParams.toString()}`;
  };
}

export function RoomPaginationWrapper({
  totalItems,
}: Pick<ItemsPaginationProps, "totalItems">) {
  const searchParams = useParsedSearchParams();
  const getPageURL = useGetPageURL();

  return (
    <ItemsPagination
      currentPage={searchParams.page}
      itemsPerPage={searchParams.pageSize}
      getPageURL={getPageURL}
      totalItems={totalItems}
    />
  );
}
