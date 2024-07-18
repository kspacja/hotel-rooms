import Link from "next/link";

import ErrorContainer from "@/components/utilities/error-container";

export default function NotFound() {
  return (
    <ErrorContainer>
      <p>Page is not found</p>
      <Link href="/" replace>
        Go back to home
      </Link>
    </ErrorContainer>
  );
}
