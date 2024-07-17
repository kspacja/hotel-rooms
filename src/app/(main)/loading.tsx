import { Skeleton } from "@/components/ui/skeleton";

const ITEMS = Array.from({ length: 4 }, (_, index) => index);

export default function Loading() {
  return (
    <ul>
      {ITEMS.map((item) => (
        <li key={item} className="mb-6">
          <Skeleton className="h-14 w-[100%] mb-2" />
          <Skeleton className="h-10 w-[100%]" />
        </li>
      ))}
    </ul>
  );
}
