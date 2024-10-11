import {render, screen} from "@testing-library/react";
import SummaryForm from "../summary/SummaryForm.jsx";
import {userEvent} from "@testing-library/user-event";

test('initial conditions', () => {
    render(<SummaryForm/>);
    const checkbox = screen.getByRole('checkbox', {name: /terms and conditions/i});
    expect(checkbox).not.toBeChecked();

    const confirmButton = screen.getByRole('button', {name: /confirm order/i});
    expect(confirmButton).toBeDisabled();
});

test('Checkbox disables button on first click and enables on second click', async () => {
    const user = userEvent.setup();

    render(<SummaryForm/>);
    const checkbox = screen.getByRole('checkbox', {name: /terms and conditions/i});
    const confirmButton = screen.getByRole('button', {name: /confirm order/i});

    await user.click(checkbox);
    expect(confirmButton).toBeEnabled();

    await user.click(checkbox);
    expect(confirmButton).toBeDisabled();
});

test('popover responds to hover', async () => {
    const user = userEvent.setup();
    render(<SummaryForm/>);

    const nullPopover = screen.queyByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();

    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);
    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    await user.unhover(termsAndConditions);
    const nullPopoverAgain = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopoverAgain).not.toBeInTheDocument();
};


