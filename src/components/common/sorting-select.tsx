"use client";

import Link from "next/link";

import { Sort } from "@/sorting";

import { cn } from "@/lib/stylingUtils";

export interface SortSelectProps {
  sort: Sort;
}

const ITEMS: [Sort, label: string][] = [
  ["price:asc", "From the cheapest"],
  ["price:desc", "From the most expensive"],
  ["name:asc", "By name - ascending"],
  ["name:desc", "By name - descending"],
];

export default function SortSelect({ sort: currentSort }: SortSelectProps) {
  return (
    <ul aria-label="Sort by" className="flex gap-2 overflow-x-auto pb-1">
      {ITEMS.map(([sort, label]) => (
        <li key={sort}>
          <Link
            href={`?sort=${encodeURIComponent(sort)}`}
            className={cn(
              { "bg-gray-200": currentSort === sort },
              "block text-sm py-2 px-3 rounded-lg border no-underline hover:bg-gray-100 whitespace-nowrap"
            )}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
