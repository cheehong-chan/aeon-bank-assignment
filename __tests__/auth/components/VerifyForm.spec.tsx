import { render, screen, fireEvent } from "@testing-library/react";
import VerifyForm from "@/auth/components/VerifyForm"; // Adjust the import path as necessary
import { vi } from "vitest"; // Mock function utility

describe("VerifyForm Component", () => {
  it("should display the secure word", () => {
    render(<VerifyForm secureWord="mySecureWord" onSubmit={vi.fn()} />);

    // Check if the secure word is rendered correctly
    const secureWordElement = screen.getByText("mySecureWord");
    expect(secureWordElement).toBeInTheDocument();
  });

  it("should render the Next button", () => {
    render(<VerifyForm secureWord="mySecureWord" onSubmit={vi.fn()} />);

    // Check if the button is rendered
    const button = screen.getByRole("button", { name: "Next" });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled(); // Button should not be disabled by default
  });

  it("should call onSubmit when the form is submitted", () => {
    const onSubmitMock = vi.fn();
    render(<VerifyForm secureWord="mySecureWord" onSubmit={onSubmitMock} />);

    const button = screen.getByRole("button");

    // Submit the form
    fireEvent.submit(button);

    // Check if the onSubmit handler was called
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });
});
