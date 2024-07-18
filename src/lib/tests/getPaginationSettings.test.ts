import getPaginationSettings from "../getPaginationSettings";

describe("getPaginationSettings", () => {
  it.each([
    [1, 4, { start: 0, end: 4 }],
    [2, 4, { start: 4, end: 8 }],
    [3, 10, { start: 20, end: 30 }],
    [1, 100, { start: 0, end: 100 }],
  ])("page=%d, pageSize=%d => %p", (page, pageSize, expected) => {
    expect(getPaginationSettings(page, pageSize)).toStrictEqual(expected);
  });

  it.each([
    [0, 4],
    [-1, 4],
    [1, 0],
    [1, -1],
    [1, 1.5],
    [1.5, 4],
  ])(
    "should throw an error when page and pageSize are invalid",
    (page, pageSize) => {
      expect(() => getPaginationSettings(page, pageSize)).toThrow();
    }
  );
});
