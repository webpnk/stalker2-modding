import {Header} from "@/Components/Header";
import {PropsWithChildren} from "react";

export default function StalkerLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto space-y-6">
            <Header />

            {children}
        </div>
    )
}
