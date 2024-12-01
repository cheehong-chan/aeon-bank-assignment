import { ApiResponse } from "../types";
import { createResponse } from "../utils";

export type Transaction = {
  date: string;
  referenceId: string;
  to: string;
  transactionType: string;
  amount: string;
};

export async function GET(): Promise<Response> {
  const data: Transaction[] = [
    {
      referenceId: "1",
      transactionType: "DuitNow Payment",
      amount: "RM 100.00",
      date: "2021-09-01",
      to: "John Doe",
    },
    {
      referenceId: "2",
      transactionType: "DuitNow Payment",
      amount: "RM 100.00",
      date: "2021-09-01",
      to: "Jane Doe",
    },
    {
      referenceId: "3",
      transactionType: "DuitNow Payment",
      amount: "RM 100.00",
      date: "2021-09-01",
      to: "Jim Doe",
    },
  ];

  const responseBody: ApiResponse<Transaction[]> = {
    success: true,
    data,
  };

  return createResponse(responseBody, 200);
}
