"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface ItemsPaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  getPageURL: (page: number) => string;
}

export default function ItemsPagination({
  totalItems,
  currentPage,
  itemsPerPage,
  getPageURL,
}: ItemsPaginationProps) {
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
