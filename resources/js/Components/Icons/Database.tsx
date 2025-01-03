import {ComponentProps} from "react";

export default function DatabaseIcon(props: ComponentProps<"svg">) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" {...props}>
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                <ellipse cx={12} cy={5} rx={9} ry={3}></ellipse>
                <path d="M3 5v14a9 3 0 0 0 18 0V5"></path>
                <path d="M3 12a9 3 0 0 0 18 0"></path>
            </g>
        </svg>
    );
}
