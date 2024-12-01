import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // For jest-dom matchers
import Button from "@/components/Button"; // Adjust the path as needed
import { vi } from "vitest";

describe("Button Component", () => {
  it("should render the button with the correct label", () => {
    const label = "Submit";
    render(
      <Button loading={false} disabled={false} type="button" label={label} />
    );

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("should disable the button when the disabled prop is true", () => {
    render(
      <Button loading={false} disabled={true} type="button" label="Submit" />
    );

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });

  it("should not be clickable when the button is disabled", () => {
    const onClickMock = vi.fn();
    render(
      <Button
        loading={false}
        disabled={true}
        type="button"
        label="Submit"
        onClick={onClickMock}
      />
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("should be clickable when not loading or disabled", () => {
    const onClickMock = vi.fn();
    render(
      <Button
        loading={false}
        disabled={false}
        type="button"
        label="Submit"
        onClick={onClickMock}
      />
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });
});
