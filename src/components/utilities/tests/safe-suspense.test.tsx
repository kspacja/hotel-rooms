import { render, screen } from "@testing-library/react";
import { lazy } from "react";

import SafeSuspense from "@/components/utilities/safe-suspense";

const LazyComponent = lazy(() => import("./LazyTestComponent"));

function ThrowingComponent() {
  throw new Error("Error occurred!");
  return null;
}

describe("SafeSuspense", () => {
  const fallback = <div>Loading...</div>;
  const errorFallback = <div>Error occurred!</div>;

  it("renders children when no error occurs", () => {
    render(
      <SafeSuspense fallback={fallback}>
        <div>Content</div>
      </SafeSuspense>
    );

    const contentElement = screen.getByText("Content");
    expect(contentElement).toBeInTheDocument();
  });

  it("renders fallback when suspense is triggered", async () => {
    render(
      <SafeSuspense fallback={fallback}>
        <LazyComponent />
      </SafeSuspense>
    );

    const fallbackElement = screen.getByText("Loading...");
    expect(fallbackElement).toBeInTheDocument();

    const lazyContentElement = await screen.findByText("Lazy loaded component");
    expect(lazyContentElement).toBeInTheDocument();
  });

  it("renders error fallback when an error occurs", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    render(
      <SafeSuspense fallback={fallback}>
        <ThrowingComponent />
      </SafeSuspense>
    );

    const errorFallbackElement = screen.getByText(/something went wrong/i);
    expect(errorFallbackElement).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  it("renders error custom fallback when an error occurs", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    render(
      <SafeSuspense fallback={fallback} errorFallback={errorFallback}>
        <ThrowingComponent />
      </SafeSuspense>
    );

    const errorFallbackElement = screen.getByText("Error occurred!");
    expect(errorFallbackElement).toBeInTheDocument();

    jest.restoreAllMocks();
  });
});
