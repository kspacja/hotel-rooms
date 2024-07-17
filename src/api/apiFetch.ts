import { API } from "./types";

export default async function apiFetch<K extends keyof API>(url: K) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<API[K]>;
}
