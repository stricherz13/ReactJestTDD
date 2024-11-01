import OrderEntry from "../OrderEntry.jsx";
import {server} from "../../../mocks/server.js";
import {http, HttpResponse} from "msw";
import {render, screen} from "@testing-library/react";

test("handles error for scoops and toppings routes", async () => {
    server.resetHandlers(
        http.get("http://localhost:3030/scoops", () => {
            return new HttpResponse(null, {status: 500});
        }),
        http.get("http://localhost:3030/toppings", () => {
            return new HttpResponse(null, {status: 500});
        })
    )

    render(<OrderEntry/>);

    const alerts = await screen.findAllByText("An unexpected error occurred. Please try again later.");
    expect(alerts).toHaveLength(2);

})