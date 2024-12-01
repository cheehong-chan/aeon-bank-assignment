import { render, screen, waitFor } from "@testing-library/react";
import TransactionTable from "@/transaction/components/TransactionTable";
import { fetchAllTransactions } from "@/services/transaction";
import { vi } from "vitest";

// Mock `Table` component to intercept props
vi.mock("@/components/DataTable", () => ({
  __esModule: true,
  default: (props: any) => {
    // Capture props for assertions
    return <div data-testid="table-props">{JSON.stringify(props)}</div>;
  },
}));

// Mock API call
vi.mock("@/services/transaction", () => ({
  fetchAllTransactions: vi.fn(),
}));

vi.mock("@/lib/formatDate", () => ({
  formatDate: (date: string) => `Formatted(${date})`,
}));

describe("TransactionTable", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("passes correct props to Table component when loading", async () => {
    render(<TransactionTable />);

    const props = JSON.parse(screen.getByTestId("table-props").textContent!);
    expect(props.loading).toBe(true);
    expect(props.error).toBeNull();
    expect(props.data).toEqual([]);
    expect(props.noDataMessage).toBe("No transactions available.");
  });

  it("passes correct props to Table component with data", async () => {
    const mockData = [
      {
        date: "2023-12-01T12:34:56Z",
        referenceId: "ABC123",
        to: "John Doe",
        transactionType: "Credit",
        amount: "$100.00",
      },
    ];

    (fetchAllTransactions as vi.Mock).mockResolvedValueOnce({
      data: mockData,
    });

    render(<TransactionTable />);

    await waitFor(() => {
      const props = JSON.parse(screen.getByTestId("table-props").textContent!);
      expect(props.loading).toBe(false);
      expect(props.error).toBeNull();
      expect(props.data).toEqual([
        {
          date: "Formatted(2023-12-01T12:34:56Z)",
          referenceId: "ABC123",
          to: "John Doe",
          transactionType: "Credit",
          amount: "$100.00",
        },
      ]);
    });
  });

  it("passes correct props to Table component on error", async () => {
    (fetchAllTransactions as vi.Mock).mockRejectedValueOnce(
      new Error("Fetch error")
    );

    render(<TransactionTable />);

    await waitFor(() => {
      const props = JSON.parse(screen.getByTestId("table-props").textContent!);
      expect(props.loading).toBe(false);
      expect(props.error).toBe("Error fetching data");
      expect(props.data).toEqual([]);
    });
  });

  it("passes correct props to Table component with no data", async () => {
    (fetchAllTransactions as vi.Mock).mockResolvedValueOnce({
      data: [],
    });

    render(<TransactionTable />);

    await waitFor(() => {
      const props = JSON.parse(screen.getByTestId("table-props").textContent!);
      expect(props.loading).toBe(false);
      expect(props.error).toBeNull();
      expect(props.data).toEqual([]);
    });
  });
});
