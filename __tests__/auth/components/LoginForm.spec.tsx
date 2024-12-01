import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "@/auth/components/LoginForm"; // Adjust path as necessary
import { vi } from "vitest"; // For mocking functions

describe("LoginForm Component", () => {
  it("should render input field and button", () => {
    render(<LoginForm loading={false} onSubmit={vi.fn()} error={null} />);

    // Check if the input field is rendered
    const input = screen.getByLabelText("Username");
    expect(input).toBeInTheDocument();

    // Check if the button is rendered
    const button = screen.getByText("Next");
    expect(button).toBeInTheDocument();
  });

  it("should update input value when typing", () => {
    render(<LoginForm loading={false} onSubmit={vi.fn()} error={null} />);

    const input = screen.getByLabelText("Username") as HTMLInputElement;

    // Simulate typing in the input field
    fireEvent.change(input, { target: { value: "testuser" } });

    // Assert that the input value is updated
    expect(input.value).toBe("testuser");
  });

  it("should call onSubmit with correct data when form is submitted", async () => {
    const onSubmitMock = vi.fn();
    render(<LoginForm loading={false} onSubmit={onSubmitMock} error={null} />);

    const input = screen.getByLabelText("Username") as HTMLInputElement;
    const button = screen.getByText("Next");

    // Fill in the input field and submit the form
    fireEvent.change(input, { target: { value: "testuser" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({ username: "testuser" });
    });
  });

  it("should not submit form if username is empty", async () => {
    const onSubmitMock = vi.fn();
    render(<LoginForm loading={false} onSubmit={onSubmitMock} error={null} />);

    const button = screen.getByText("Next");

    // Try submitting the form with empty input
    fireEvent.click(button);

    await waitFor(() => {
      expect(onSubmitMock).not.toHaveBeenCalled(); // Form should not submit
    });
  });

  it("should disable button when form is loading", () => {
    render(<LoginForm loading={true} onSubmit={vi.fn()} error={null} />);

    const button = screen.getByRole("button");

    // Check if the button is disabled when loading is true
    expect(button).toBeDisabled();
  });

  it("should display error message if error is provided", () => {
    const errorMessage = "An error occurred";
    render(
      <LoginForm loading={false} onSubmit={vi.fn()} error={errorMessage} />
    );

    // Check if the error message is displayed
    const errorText = screen.getByText(errorMessage);
    expect(errorText).toBeInTheDocument();
  });

  it("should disable button when input is empty and loading is false", () => {
    render(<LoginForm loading={false} onSubmit={vi.fn()} error={null} />);

    const button = screen.getByRole("button");
    const input = screen.getByLabelText("Username") as HTMLInputElement;

    // Button should be disabled when input is empty
    expect(button).toBeDisabled();

    // Fill in the input field
    fireEvent.change(input, { target: { value: "testuser" } });

    // Button should be enabled once input is filled
    expect(button).toBeEnabled();
  });
});
