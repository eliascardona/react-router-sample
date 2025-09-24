import type { ReactNode } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";

export function ChartContainer({ children }: { children: ReactNode }) {
    return (
        <div className="w-full grid justify-items-center">
            <div className="w-[90%]">
                <ScrollArea className="h-[88vh] border-b-2 border-red-400">
                    {children}
                </ScrollArea>
            </div>
        </div>
    )
}