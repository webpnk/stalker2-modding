import { PageProps } from '@/types';
import {Header} from "@/Components/Header";
import {ModdingStatus} from "@/Components/ModdingStatus";
import {ModList} from "@/Components/ModList";

export default function Home({}: PageProps) {
    return (
        <>
            <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto space-y-6">
                <Header />

                <div className="grid md:grid-cols-2 gap-6">
                    <ModdingStatus />
                    <ModList />
                </div>

                <div className="stalker-panel">
                    <h2 className="stalker-header mb-4">About STALKER 2 Modding</h2>
                    <div className="stalker-description">
                        <p>
                            STALKER 2: Heart of Chornobyl represents the next generation of the legendary series.
                            Built on Unreal Engine 5, the game promises advanced modding capabilities once tools
                            become available. The modding community is actively preparing for the game's release,
                            with early discussions focusing on potential modding approaches and tool development.
                        </p>
                        <div className="mt-4 p-3 bg-[#4a2b23]/30 rounded">
                            <strong className="block mb-2">Current Focus Areas:</strong>
                            <ul className="list-disc list-inside space-y-1 opacity-80">
                                <li>Understanding Unreal Engine 5 modding capabilities</li>
                                <li>Developing community modding tools</li>
                                <li>Documenting game file structures and formats</li>
                                <li>Preparing tutorials and resources for future modders</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
