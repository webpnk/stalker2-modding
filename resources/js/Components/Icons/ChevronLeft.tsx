import {ComponentProps} from "react";

export default function ChevronLeftIcon(props: ComponentProps<"svg">) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" {...props}>
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="m15 18l-6-6l6-6"></path>
        </svg>
    )
}
