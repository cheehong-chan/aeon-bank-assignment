import { GetSecureWordRes } from "@/api/getSecureWord/route";
import { LoginRes } from "@/api/login/route";
import { ApiResponse } from "@/api/types";

export const getSecureWord = async (
  username: string
): Promise<ApiResponse<GetSecureWordRes>> => {
  const response = await fetch("/api/getSecureWord", {
    method: "POST",
    body: JSON.stringify({ username }),
  });
  const data = await response.json();
  return data;
};

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<ApiResponse<LoginRes>> => {
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  return data;
};
