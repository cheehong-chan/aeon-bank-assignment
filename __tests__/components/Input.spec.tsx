import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@/components/Input";

describe("Input Component", () => {
  it("should render an input with the correct label and placeholder", () => {
    render(
      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        onChange={() => {}}
      />
    );

    // Check if the label is displayed
    const label = screen.getByLabelText(/email/i);
    expect(label).toBeInTheDocument();

    // Check if the input field has the correct placeholder
    const input = screen.getByPlaceholderText(/enter your email/i);
    expect(input).toBeInTheDocument();
  });

  it("should call onChange handler when typing in the input", () => {
    const onChangeMock = vi.fn(); // Create a mock function for onChange

    render(
      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        onChange={onChangeMock}
      />
    );

    const input = screen.getByPlaceholderText(/enter your email/i);

    // Simulate typing in the input field
    fireEvent.change(input, { target: { value: "test@example.com" } });

    // Assert that the onChange function was called once with the correct value
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "test@example.com",
        }),
      })
    );
  });

  it("should disable the input when the disabled prop is passed", () => {
    render(
      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        disabled={true}
        onChange={() => {}}
      />
    );

    const input = screen.getByPlaceholderText(/enter your email/i);

    // Check that the input is disabled
    expect(input).toBeDisabled();
  });

  it("should not disable the input when the disabled prop is not passed", () => {
    render(
      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        onChange={() => {}}
      />
    );

    const input = screen.getByPlaceholderText(/enter your email/i);

    // Check that the input is not disabled
    expect(input).not.toBeDisabled();
  });
});
