import { formatDate } from "@/lib/formatDate";

describe("formatDate", () => {
  it("formats a valid date string to 'DD MMM YYYY' format", () => {
    const dateString = "2023-12-01T12:00:00Z"; // Example ISO 8601 date string
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe("01 Dec 2023");
  });

  it("formats a different valid date string correctly", () => {
    const dateString = "2021-05-15T00:00:00Z"; // Another example date string
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe("15 May 2021");
  });

  it("handles invalid date strings gracefully", () => {
    const invalidDateString = "invalid-date-string";
    const formattedDate = formatDate(invalidDateString);
    expect(formattedDate).toBe("Invalid Date"); // Default JavaScript behavior for invalid date
  });

  it("formats the current date correctly", () => {
    const currentDate = new Date().toISOString(); // Get the current date in ISO 8601 format
    const formattedDate = formatDate(currentDate);
    const today = new Date();
    const expectedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(today);

    expect(formattedDate).toBe(expectedDate);
  });
});
