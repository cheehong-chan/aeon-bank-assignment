import { ApiResponse } from "../types";
import { createResponse } from "../utils";

export type LoginRes = object;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;
    if (!password || !username) {
      const responseBody: ApiResponse<{ message: string }> = {
        success: false,
        data: { message: "Username and Password is required" },
      };
      return createResponse(responseBody, 400);
    }

    const responseBody: ApiResponse<LoginRes> = {
      success: true,
      data: {},
    };

    return createResponse(responseBody, 200);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const responseBody: ApiResponse<{ message: string }> = {
      success: false,
      data: { message },
    };
    return createResponse(responseBody, 500);
  }
}
