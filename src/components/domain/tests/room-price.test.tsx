import { render, screen } from "@testing-library/react";

import RoomPrice from "@/components/domain/room-price";

function getPricesElements() {
  const currentPriceElement = screen.getByLabelText(/current price/i);
  const originalPriceElement = screen.queryByLabelText(/original price/i);

  return { currentPriceElement, originalPriceElement };
}

describe("RoomPrice", () => {
  const originalPrice = {
    currencyCode: "PLN" as const,
    value: 100,
  };

  const nextPrice = {
    currencyCode: "PLN" as const,
    value: 90,
  };

  const noNextPrice = null;

  it("renders the current price when nextPrice is provided", () => {
    render(<RoomPrice nextPrice={nextPrice} originalPrice={originalPrice} />);

    const { currentPriceElement, originalPriceElement } = getPricesElements();

    expect(currentPriceElement).toBeInTheDocument();
    expect(originalPriceElement).toBeInTheDocument();

    expect(currentPriceElement).toHaveTextContent("PLN 90.00");
    expect(originalPriceElement).toHaveTextContent("PLN 100.00");
  });

  it("renders the original price when nextPrice is not provided", () => {
    render(<RoomPrice nextPrice={noNextPrice} originalPrice={originalPrice} />);

    const { currentPriceElement, originalPriceElement } = getPricesElements();

    expect(currentPriceElement).toBeInTheDocument();
    expect(originalPriceElement).not.toBeInTheDocument();

    expect(currentPriceElement).toHaveTextContent("PLN 100.00");
  });

  it("renders the current price when nextPrice is equal to originalPrice", () => {
    render(
      <RoomPrice
        nextPrice={{ ...originalPrice }}
        originalPrice={originalPrice}
      />
    );

    const { currentPriceElement, originalPriceElement } = getPricesElements();

    expect(currentPriceElement).toBeInTheDocument();
    expect(originalPriceElement).not.toBeInTheDocument();

    expect(currentPriceElement).toHaveTextContent("PLN 100.00");
  });
});
