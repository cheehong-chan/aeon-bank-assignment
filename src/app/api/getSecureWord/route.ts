import { ApiResponse } from "../types";
import { createResponse } from "../utils";

export type GetSecureWordRes = {
  secureWord: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username } = body;

    if (!username) {
      const responseBody: ApiResponse<{ message: string }> = {
        success: false,
        data: { message: "Username required" },
      };
      return createResponse(responseBody, 400);
    }

    const responseBody: ApiResponse<{ secureWord: string }> = {
      success: true,
      data: { secureWord: "secure123" },
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
