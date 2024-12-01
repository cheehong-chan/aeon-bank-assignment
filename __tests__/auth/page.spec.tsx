import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Page from "@/auth/page"; // Adjust the import path as necessary
import { vi } from "vitest";
import { getSecureWord, login } from "@/services/auth";
import { useRouter } from "next/navigation";

// Mock services and router
vi.mock("@/services/auth", () => ({
  getSecureWord: vi.fn(),
  login: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("Page Component", () => {
  const pushMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as vi.Mock).mockReturnValue({ push: pushMock });
  });

  it("renders the LoginForm initially", () => {
    render(<Page />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("proceeds to VerifyForm after successful login", async () => {
    (getSecureWord as vi.Mock).mockResolvedValueOnce({
      data: { secureWord: "secure123" },
    });

    render(<Page />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testUser" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(screen.getByText("Your Secure Word:")).toBeInTheDocument();
    });
    expect(screen.getByText("secure123")).toBeInTheDocument();
  });

  it("displays an error if login fails", async () => {
    (getSecureWord as vi.Mock).mockRejectedValueOnce(new Error("API Error"));

    render(<Page />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testUser" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(
        screen.getByText("Error fetching secure word")
      ).toBeInTheDocument();
    });
  });

  it("proceeds to PasswordForm after VerifyForm submission", async () => {
    render(<Page />);

    // Mock step 1 to VerifyForm
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testUser" },
    });
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: "Next" }));
    });
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: "Next" }));
    });

    await waitFor(() => {
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });
  });

  it("submits password and navigates to transaction page", async () => {
    (login as vi.Mock).mockResolvedValueOnce({});
    render(<Page />);

    // Mock steps to PasswordForm
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testUser" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    await waitFor(() => {});
    fireEvent.click(screen.getByRole("button", { name: "Next" })); // Step 2
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/transaction");
    });
  });

  it("displays an error if password submission fails", async () => {
    (login as vi.Mock).mockRejectedValueOnce(new Error("Login Error"));

    render(<Page />);

    // Mock steps to PasswordForm
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testUser" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    await waitFor(() => {});
    fireEvent.click(screen.getByRole("button", { name: "Next" })); // Step 2
    await waitFor(() => {});
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(
        screen.getByText("Incorrect password or username")
      ).toBeInTheDocument();
    });
  });

  it("navigates back to the previous step using the Back button", () => {
    render(<Page />);

    // Mock step 1 to VerifyForm
    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    const backButton = screen.getByText("Back");
    fireEvent.click(backButton);

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("navigates to the home page when Back is clicked at the first step", () => {
    render(<Page />);

    const backButton = screen.getByText("Back");
    fireEvent.click(backButton);

    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
