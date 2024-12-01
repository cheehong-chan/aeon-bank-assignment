import { render, screen } from "@testing-library/react";
import Table from "@/components/DataTable";

// Mocking the Loader component
vi.mock("@/components/Loader", () => ({
  __esModule: true,
  default: () => <div data-testid="loader">Mock Loader</div>,
}));

describe("Table component", () => {
  const columns = [
    { header: "Name", key: "name" },
    { header: "Age", key: "age" },
    { header: "Email", key: "email" },
  ];

  const data = [
    { name: "John Doe", age: 30, email: "john.doe@example.com" },
    { name: "Jane Smith", age: 25, email: "jane.smith@example.com" },
  ];

  it("renders table headers correctly", () => {
    render(<Table columns={columns} data={data} loading={false} />);

    columns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });
  });

  it("renders table data rows correctly", () => {
    render(<Table columns={columns} data={data} loading={false} />);

    data.forEach((row) => {
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(row.age.toString())).toBeInTheDocument();
      expect(screen.getByText(row.email)).toBeInTheDocument();
    });
  });

  it("renders a loader when loading", () => {
    render(<Table columns={columns} data={[]} loading={true} />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  it("renders an error message when there is an error", () => {
    const errorMessage = "Failed to load data.";
    render(
      <Table columns={columns} data={[]} loading={false} error={errorMessage} />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByText("Loading data...")).not.toBeInTheDocument();
  });

  it("renders a no data message when data is empty", () => {
    const noDataMessage = "No records found.";
    render(
      <Table
        columns={columns}
        data={[]}
        loading={false}
        noDataMessage={noDataMessage}
      />
    );

    expect(screen.getByText(noDataMessage)).toBeInTheDocument();
  });

  it("applies alternating row styles", () => {
    render(<Table columns={columns} data={data} loading={false} />);

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveClass("bg-white"); // First data row
    expect(rows[2]).toHaveClass("bg-gray-100"); // Second data row
  });

  it("renders no rows when loading is true", () => {
    render(<Table columns={columns} data={data} loading={true} />);

    expect(screen.queryByText(data[0].name)).not.toBeInTheDocument();
    expect(screen.queryByText(data[1].name)).not.toBeInTheDocument();
  });
});
