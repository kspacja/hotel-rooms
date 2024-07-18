import { useSearchParams } from "next/navigation";
import searchParamsParse from "./searchParamsParse";
import { useMemo } from "react";

export default function useParsedSearchParams() {
  const searchParams = useSearchParams();

  const searchParamsRecord = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  const parsedSearchParams = searchParamsParse(searchParamsRecord);

  if (!parsedSearchParams.success) {
    throw new Error("Invalid search params");
  }

  return parsedSearchParams.data;
}
