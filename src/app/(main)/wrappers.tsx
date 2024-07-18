"use client";

import { useSearchParams } from "next/navigation";

import useParsedSearchParams from "@/lib/useParsedSearchParams";

import SortingSelect from "@/components/common/sorting-select";
import ItemsPagination, {
  ItemsPaginationProps,
} from "@/components/common/items-pagination";

export function RoomsSortingSelectWrapper() {
  const searchParams = useParsedSearchParams();

  return <SortingSelect sorting={searchParams.sort} />;
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
