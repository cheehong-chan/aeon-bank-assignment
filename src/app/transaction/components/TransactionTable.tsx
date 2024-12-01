"use client";

import { Transaction } from "@/api/transaction-history/route";
import Table from "@/components/DataTable";
import { formatDate } from "@/lib/formatDate";
import { fetchAllTransactions } from "@/services/transaction";
import React, { useState, useEffect } from "react";

const TransactionTable: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Transaction[]>([]);

  const columns = [
    { header: "Date", key: "date" },
    { header: "Reference ID", key: "referenceId" },
    { header: "To", key: "to" },
    { header: "Transaction Type", key: "transactionType" },
    { header: "Amount", key: "amount" },
  ];

  const fetchData = async () => {
    try {
      const res = await fetchAllTransactions();
      const data = res.data?.map((transaction) => ({
        ...transaction,
        date: formatDate(transaction.date),
      }));
      setData(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table
        columns={columns}
        data={data}
        loading={loading}
        error={error}
        noDataMessage="No transactions available."
      />
    </div>
  );
};

export default TransactionTable;
