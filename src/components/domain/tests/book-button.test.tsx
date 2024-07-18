import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BookButton from "@/components/domain/book-button";

async function setupBookButtonTest() {
  const group = jest.spyOn(console, "group").mockImplementation(() => {});
  const log = jest.spyOn(console, "log").mockImplementation(() => {});

  const buttonElement = screen.getByRole("button", { name: /book/i });

  await userEvent.click(buttonElement);

  const allConsoleLogCalls = [
    ...group.mock.calls.flat(),
    ...log.mock.calls.flat(),
  ];

  return { allConsoleLogCalls, buttonElement };
}

describe("BookButton", () => {
  const room = {
    id: 1,
    name: "Room 1",
    price: {
      currencyCode: "PLN" as const,
      value: 100,
    },
  };

  const availability = {
    availabilityStatus: "available" as const,
    price: {
      currencyCode: "PLN" as const,
      value: 90,
    },
  };

  const availabilityOnRequest = {
    availabilityStatus: "onRequest" as const,
    price: {
      currencyCode: "PLN" as const,
      value: 90,
    },
  };

  const availabilityNoPrice = {
    availabilityStatus: "available" as const,
    price: null,
  };

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it("works correct when availabilityStatus=available", async () => {
    render(<BookButton room={room} availibility={availability} />);

    const { buttonElement, allConsoleLogCalls: allConsoleLogs } =
      await setupBookButtonTest();

    expect(buttonElement).toBeEnabled();

    expect(allConsoleLogs).toMatchInlineSnapshot(`
[
  "Booking room Room 1",
  "Room ID:",
  1,
  "Price:",
  "PLN 100.00",
  "Availability:",
  "available",
  "next price",
  "PLN 90.00",
]
`);
  });

  it("works correct when availabilityStatus is other then availiable", async () => {
    render(<BookButton room={room} availibility={availabilityOnRequest} />);

    const { buttonElement, allConsoleLogCalls: allConsoleLogs } =
      await setupBookButtonTest();

    expect(buttonElement).toBeDisabled();
    expect(allConsoleLogs).toStrictEqual([]);
  });

  it("doesnt show next price if it is not set", async () => {
    render(<BookButton room={room} availibility={availabilityNoPrice} />);

    const { buttonElement, allConsoleLogCalls: allConsoleLogs } =
      await setupBookButtonTest();

    expect(buttonElement).toBeEnabled();
    expect(allConsoleLogs).toEqual(expect.not.arrayContaining(["next price"]));
  });
});
