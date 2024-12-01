import React from "react";
import TransactionTable from "./components/TransactionTable";

function Page() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Transaction Table</h1>
      <TransactionTable />
    </div>
  );
}

export default Page;
