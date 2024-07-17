"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SortingSelect() {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const sorting = searchParams.get("sort") ?? "price:asc";

  return (
    <Select
      defaultValue={sorting}
      onValueChange={(value) => {
        const newSearchParams = new URLSearchParams();
        newSearchParams.set("sort", value);

        push(`?${newSearchParams.toString()}`);
      }}
    >
      <SelectTrigger className="w-[250px] justify-start gap-2">
        Sort by: <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price:asc">From the cheapest</SelectItem>
        <SelectItem value="price:desc">From the most expensive</SelectItem>
        <SelectItem value="name:asc">By name - ascending</SelectItem>
        <SelectItem value="name:desc">By name - descending</SelectItem>
      </SelectContent>
    </Select>
  );
}
