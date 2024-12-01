import React from "react";
import Loader from "./Loader";

type Column = {
  header: string;
  key: string;
};

type TableProps<T> = {
  columns: Column[];
  data: T[];
  loading: boolean;
  error?: string | null;
  noDataMessage?: string;
};

const Table = <T,>({
  columns,
  data,
  loading,
  error,
  noDataMessage = "No data available.",
}: TableProps<T>) => {
  const cellClass = "border border-gray-200 px-4 py-2 text-black text-center";

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full shadow-md">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={cellClass}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={columns.length} className={`${cellClass} bg-white`}>
                <span className="flex justify-center gap-x-2">
                  <Loader size={24} />
                  Loading data...
                </span>
              </td>
            </tr>
          )}
          {!loading && error && (
            <tr>
              <td
                colSpan={columns.length}
                className={`${cellClass} bg-white text-red-500`}
              >
                {error}
              </td>
            </tr>
          )}
          {!loading && !error && data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className={cellClass}>
                {noDataMessage}
              </td>
            </tr>
          )}
          {!loading &&
            !error &&
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className={cellClass}>
                    {(row as any)[column.key]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
