"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sort } from "@/sorting";

export interface SortingSelectProps {
  sorting: string;
  onSortChange: (sort: string) => void;
}

const ITEMS: [Sort, label: string][] = [
  ["price:asc", "From the cheapest"],
  ["price:desc", "From the most expensive"],
  ["name:asc", "By name - ascending"],
  ["name:desc", "By name - descending"],
];

export default function SortingSelect({
  sorting,
  onSortChange,
}: SortingSelectProps) {
  return (
    <Select defaultValue={sorting} onValueChange={onSortChange}>
      <SelectTrigger className="w-[250px] justify-start gap-2">
        Sort by: <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ITEMS.map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
