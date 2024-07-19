import { API } from "./types";

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined. Please define it in .env.local file based on .env.example file."
  );
}

export default async function apiFetch<K extends keyof API>(url: K) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<API[K]>;
}
