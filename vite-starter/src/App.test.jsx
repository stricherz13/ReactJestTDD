import {fireEvent, render, screen} from "@testing-library/react";
import App from "./App";
import {kebabCaseToTitleCase} from "./helpers.js";

test("button click flow", () => {
    render(<App/>);
    const buttonElement = screen.getByRole("button", {name: /blue/i});
    expect(buttonElement).toHaveClass("medium-violet-red");

    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent(/red/i);
    expect(buttonElement).toHaveClass("midnight-blue");
});

test("button has correct label and color after click", () => {
    render(<App/>);
    const buttonElement = screen.getByRole("button", {name: /blue/i});
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveStyle({backgroundColor: "rgb(0, 0, 255)"});
    expect(buttonElement).toHaveTextContent(/red/i);
});

test("Checkbox flows", () => {
    render(<App/>);
    const buttonElement = screen.getByRole("button", {name: /blue/i});
    const checkboxElement = screen.getByRole("checkbox", {name: /disable button/i});

    expect(buttonElement).toBeEnabled();
    expect(checkboxElement).not.toBeChecked();

    fireEvent.click(checkboxElement);
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass("gray");

    fireEvent.click(checkboxElement);
    expect(buttonElement).toBeEnabled();
    expect(buttonElement).toHaveClass("medium-violet-red");
});

test("checkbox flow after button click", () => {
    render(<App/>);
    const buttonElement = screen.getByRole("button", {name: /blue/i});
    const checkboxElement = screen.getByRole("checkbox", {name: /disable button/i});

    fireEvent.click(buttonElement);
    fireEvent.click(checkboxElement);
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass("gray");

    fireEvent.click(checkboxElement);
    expect(buttonElement).toBeEnabled();
    expect(buttonElement).toHaveClass("midnight-blue");
});

describe("kebabCaseToTitleCase", () => {
    test('works for no hyphens', () => {
        expect(kebabCaseToTitleCase('red')).toBe('Red');
    });
    test('works for one hyphen', () => {
        expect(kebabCaseToTitleCase('midnight-blue')).toBe('Midnight Blue');
    });
    test('works for multiple hyphens', () => {
        expect(kebabCaseToTitleCase('medium-violet-red')).toBe('Medium Violet Red');
    });
});
