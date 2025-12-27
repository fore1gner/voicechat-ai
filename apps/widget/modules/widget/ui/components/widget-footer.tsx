import { Button } from "@workspace/ui/components/button";
import { HomeIcon, InboxIcon } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { useState } from "react";

export const WidgetFooter = () => {
    const [screen, setScreen] = useState<"selection" | "inbox">("selection");

    return (
        <footer className="flex items-center justify-between border-t bg-background">
            <Button
                className="h-14 flex-1 rounded-none"
                variant="ghost"
                size="icon"
                onClick={() => setScreen("selection")}>
                <HomeIcon
                    className={cn("size-5", screen === "selection" && "text-primary")}
                />
            </Button>
            <Button
                className="h-14 flex-1 rounded-none"
                variant="ghost"
                size="icon"
                onClick={() => setScreen("inbox")}>
                <InboxIcon
                    className={cn("size-5", screen === "inbox" && "text-primary")}
                />
            </Button>
        </footer>
    );
};