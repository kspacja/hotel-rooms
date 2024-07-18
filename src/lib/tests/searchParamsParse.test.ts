import searchParamsParse, { DEFAULT_PARAMS } from "../searchParamsParse";

const searchParamsA = {
  page: "4",
  pageSize: "3",
  sort: "price:asc",
};

const searchParamsAParsed = {
  ...searchParamsA,
  page: Number(searchParamsA.page),
  pageSize: Number(searchParamsA.pageSize),
};

describe("searchParamsParse", () => {
  it.each([
    [{}, true, DEFAULT_PARAMS], // default values on empty
    [searchParamsA, true, searchParamsAParsed], // valid values
    [{ page: "error-value" }, false, undefined], // invalid page
    [{ page: "error-value", sort: "price:asc" }, false, undefined], // partly invalid values
    [{ pageSize: "1.5" }, false, undefined], // invalid pageSize,
    [{ pageSize: "10" }, false, undefined], // too big pageSize,
    [{ sort: "invalid-sort" }, false, undefined], // invalid sort
  ])("%p => success=%p, data=%p", (params, expectedSuccess, expectedData) => {
    const result = searchParamsParse(params);
    expect(result.success).toBe(expectedSuccess);
    expect(result.data).toStrictEqual(expectedData);
  });
});
