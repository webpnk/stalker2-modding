import {ComponentProps} from "react";

export default function UserIcon(props: ComponentProps<"svg">) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" {...props}>
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx={12} cy={7} r={4}></circle>
            </g>
        </svg>
    )
}
