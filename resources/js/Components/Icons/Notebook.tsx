import {ComponentProps} from "react";

export default function NotebookIcon(props: ComponentProps<"svg">) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" {...props}>
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                <path d="M2 6h4m-4 4h4m-4 4h4m-4 4h4"></path>
                <rect width={16} height={20} x={4} y={2} rx={2}></rect>
                <path d="M16 2v20"></path>
            </g>
        </svg>
    )
}
