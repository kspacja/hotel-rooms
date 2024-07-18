import { render, screen } from "@testing-library/react";
import ItemsPagination from "@/components/common/items-pagination";
import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";

function SimpleRouter({
  children,
}: {
  children: (page: number) => React.ReactNode;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    window.history.pushState({}, "", `#page-${currentPage}`);

    const popstateHandler = () => {
      setCurrentPage(Number(window.location.hash.split("page-")[1]));
    };

    window.addEventListener("popstate", popstateHandler);

    return () => {
      window.removeEventListener("popstate", popstateHandler);
    };
  });

  return children(currentPage);
}

function getLinks(currentPage: number) {
  const prev = screen.queryByRole("link", { name: /previous/i });
  const next = screen.queryByRole("link", { name: /next/i });
  const page = screen.queryByRole("link", {
    name: new RegExp(currentPage.toString(), "i"),
  });

  const count = [prev, next, page].filter(Boolean).length;

  return { prev, next, page, count };
}

describe("ItemsPagination", () => {
  const totalItems = 30;
  const itemsPerPage = 10;
  const getPageURL = (page: number) => `#page-${page}`;

  it("renders pagination correctly", async () => {
    render(
      <SimpleRouter>
        {(page) => (
          <ItemsPagination
            totalItems={totalItems}
            currentPage={page}
            itemsPerPage={itemsPerPage}
            getPageURL={getPageURL}
          />
        )}
      </SimpleRouter>
    );

    const page1Links = getLinks(1);

    expect(page1Links.count).toBe(2);
    expect(page1Links.prev).not.toBeInTheDocument();
    expect(page1Links.next).toBeInTheDocument();
    expect(page1Links.page).toBeInTheDocument();

    if (page1Links.next) {
      await userEvent.click(page1Links.next);
    }

    const page2Link = getLinks(2);
    expect(page2Link.count).toBe(3);
    expect(page2Link.prev).toBeInTheDocument();
    expect(page2Link.next).toBeInTheDocument();
    expect(page2Link.page).toBeInTheDocument();

    if (page2Link.next) {
      await userEvent.click(page2Link.next);
    }

    const page3Link = getLinks(3);
    expect(page3Link.count).toBe(2);
    expect(page3Link.prev).toBeInTheDocument();
    expect(page3Link.next).not.toBeInTheDocument();
    expect(page3Link.page).toBeInTheDocument();
  });
});
