import {useState} from "react";
import {Button, Form, OverlayTrigger, Popover} from "react-bootstrap";

export default function SummaryForm() {
    const [tcChecked, setTcChecked] = useState(false);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body> No ice cream will actually be delivered</Popover.Body>
        </Popover>
    );


    const checkboxLabel = (
            <span>
            I agree to
                <OverlayTrigger overlay={popover} placement="right">
                    <span style={{color: 'blue'}}>Terms and Conditions</span>
                </OverlayTrigger>
            </span>
        );

    return (
        <Form>
            <Form.Group controlId="terms-and-conditions">
                <Form.Check
                    type="checkbox"
                    checked={tcChecked}
                    onChange={e => setTcChecked(e.target.checked)}
                    label={checkboxLabel}
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!tcChecked}>
                Confirm order
            </Button>
        </Form>
    )
}
