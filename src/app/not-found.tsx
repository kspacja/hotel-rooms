import ErrorContainer from "@/components/utilities/error-container";
import Link from "next/link";

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
