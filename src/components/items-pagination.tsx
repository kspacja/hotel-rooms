"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

export interface ItemsPaginationProps {
  totalItems: number;
}

function useGetPageURL() {
  const searchParams = useSearchParams();

  return (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", String(page));

    return `?${newSearchParams.toString()}`;
  };
}

export default function ItemsPagination({ totalItems }: ItemsPaginationProps) {
  const searchParams = useSearchParams();
  const getPageURL = useGetPageURL();

  const currentPage = Number(searchParams.get("page") ?? 1);
  const itemsPerPage = Number(searchParams.get("pageSize") ?? 4);

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Pagination className="justify-start">
      <PaginationContent>
        {prevPage > 0 && (
          <PaginationItem>
            <PaginationPrevious href={getPageURL(prevPage)} />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href={getPageURL(currentPage)} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {nextPage <= totalPages && (
          <PaginationItem>
            <PaginationNext href={getPageURL(nextPage)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
