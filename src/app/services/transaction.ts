import { Transaction } from "@/api/transaction-history/route";
import { ApiResponse } from "@/api/types";

export const fetchAllTransactions = async (): Promise<
  ApiResponse<Transaction[]>
> => {
  const response = await fetch("/api/transaction-history");
  const data = await response.json();
  return data;
};
