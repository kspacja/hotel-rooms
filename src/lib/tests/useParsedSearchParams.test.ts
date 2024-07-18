import { renderHook } from "@testing-library/react";

import * as nextNavigation from "next/navigation";
import useParsedSearchParams from "../useParsedSearchParams";
import { DEFAULT_PARAMS } from "../searchParamsParse";

jest.mock("next/navigation");

describe("useParsedSearchParams", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should show value if there correct", () => {
    const mockSearchParams = new URLSearchParams({
      page: "1",
      pageSize: "4",
    }) as nextNavigation.ReadonlyURLSearchParams;
    jest
      .spyOn(nextNavigation, "useSearchParams")
      .mockReturnValue(mockSearchParams);

    const { result } = renderHook(() => useParsedSearchParams());

    expect(result.current).toStrictEqual(DEFAULT_PARAMS);
  });

  it("should return parsed search params if they are valid", () => {
    const mockSearchParams = new URLSearchParams({
      page: "invalid-page",
    }) as nextNavigation.ReadonlyURLSearchParams;

    jest
      .spyOn(nextNavigation, "useSearchParams")
      .mockReturnValue(mockSearchParams);

    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      renderHook(() => useParsedSearchParams());
    }).toThrow();
  });
});
