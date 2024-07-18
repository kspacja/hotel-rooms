import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import searchParamsParse from "./searchParamsParse";

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
