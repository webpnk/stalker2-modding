import {ComponentProps} from "react";

export default function TerminalIcon(props: ComponentProps<"svg">) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" {...props}>
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="m4 17l6-6l-6-6m8 14h8"></path>
        </svg>
    )
}
