"use client";

import ErrorContainer from "@/components/utilities/error-container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <ErrorContainer>
          <p>{error.message}</p>
          <pre>{error.digest}</pre>
          <button onClick={() => reset()}>Try again</button>
        </ErrorContainer>
      </body>
    </html>
  );
}
