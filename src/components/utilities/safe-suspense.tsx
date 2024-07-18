import { Suspense } from "react";
import ErrorBoundary from "@/components/utilities/error-boundary";

export default function SafeSuspense({
  fallback,
  children,
  errorFallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
  errorFallback?: React.ReactNode;
}) {
  return (
    <ErrorBoundary
      fallback={
        errorFallback ?? (
          <p className="text-red-500">Something went wrong, try again later</p>
        )
      }
    >
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
