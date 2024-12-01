import { ApiResponse } from "./types";

export function createResponse<T>(
  body: ApiResponse<T>,
  status: number
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
