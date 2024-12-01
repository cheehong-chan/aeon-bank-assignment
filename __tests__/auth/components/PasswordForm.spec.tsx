import { render, screen, fireEvent } from "@testing-library/react";
import PasswordForm from "@/auth/components/PasswordForm"; // Adjust the import path as necessary
import { vi } from "vitest";

describe("PasswordForm Component", () => {
  it("renders the password input field with correct properties", () => {
    render(<PasswordForm loading={false} onSubmit={vi.fn()} error={null} />);

    const input = screen.getByLabelText("Password");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
    expect(input).not.toBeDisabled();
  });

  it("displays an error message when `error` is provided", () => {
    render(
      <PasswordForm
        loading={false}
        onSubmit={vi.fn()}
        error="Invalid password"
      />
    );

    const errorMessage = screen.getByText("Invalid password");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red-500");
  });

  it("disables the button when `loading` is true or the password is empty", () => {
    const { rerender } = render(
      <PasswordForm loading={false} onSubmit={vi.fn()} error={null} />
    );

    // Initially disabled due to empty password
    let button = screen.getByRole("button");
    expect(button).toBeDisabled();

    // Enter a password to enable the button
    const input = screen.getByLabelText("Password");
    fireEvent.change(input, { target: { value: "password123" } });
    expect(button).not.toBeDisabled();

    // When loading is true, the button is disabled again
    rerender(<PasswordForm loading={true} onSubmit={vi.fn()} error={null} />);
    button = screen.getByRole("button", { name: "Login" });
    expect(button).toBeDisabled();
  });

  it("calls `onSubmit` with the correct password when the form is submitted", () => {
    const onSubmitMock = vi.fn();
    render(
      <PasswordForm loading={false} onSubmit={onSubmitMock} error={null} />
    );

    const input = screen.getByLabelText("Password");
    const button = screen.getByRole("button");

    // Enter a password and submit the form
    fireEvent.change(input, { target: { value: "password123" } });
    fireEvent.click(button);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith({ password: "password123" });
  });
});
