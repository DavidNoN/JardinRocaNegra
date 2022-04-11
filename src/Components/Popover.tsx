import { Popover } from "react-bootstrap";

export const popover = ( title: string, body: ( string | JSX.Element )[] | string ) => (
    <Popover id="popover-basic">
        <Popover.Header as="h3">{ title }</Popover.Header>
        <Popover.Body>
            { body }
        </Popover.Body>
    </Popover>
);
