import { redirect } from "next/navigation";
import { RedirectType } from "next/navigation";

export default function NotFound() {
  redirect("/", RedirectType.replace);
}
