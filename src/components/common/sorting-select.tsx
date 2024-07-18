"use client";

import Link from "next/link";

import { Sort } from "@/sorting";

import { cn } from "@/lib/stylingUtils";

export interface SortingSelectProps {
  sorting: string;
}

const ITEMS: [Sort, label: string][] = [
  ["price:asc", "From the cheapest"],
  ["price:desc", "From the most expensive"],
  ["name:asc", "By name - ascending"],
  ["name:desc", "By name - descending"],
];

export default function SortingSelect({ sorting }: SortingSelectProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {ITEMS.map(([sort, label]) => (
        <Link
          key={sort}
          href={`?sort=${encodeURIComponent(sort)}`}
          className={cn(
            { "bg-gray-200": sorting === sort },
            "text-sm py-2 px-3 rounded-lg border no-underline hover:bg-gray-100 whitespace-nowrap"
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
