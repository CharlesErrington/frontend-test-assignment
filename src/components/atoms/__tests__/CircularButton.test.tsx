import { render, screen, fireEvent } from "@testing-library/react";
import { CircularButton } from "../CircularButton";
import { describe, it, expect, vi } from "vitest";

describe("CircularButton", () => {
  it("renders the button with the provided icon", () => {
    const mockIcon = <div data-testid="button-icon" />;
    render(
      <CircularButton icon={mockIcon} onClick={() => console.log("Click")} />,
    );
    expect(screen.getByTestId("button-icon")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("triggers on click function when clicked", () => {
    const mockIcon = <div data-testid="button-icon" />;
    const onClickMock = vi.fn();
    render(<CircularButton icon={mockIcon} onClick={onClickMock} />);
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
