"use client"
import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const {
        isConnected,
        isConnecting,
        isSpeaking,
        transcript,
        startCall,
        endCall,
  } = useVapi();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Button onClick={() => startCall()}>Start Call</Button>
            <Button onClick={() => endCall()} variant={"destructive"}>End Call</Button>
            <p>is Connected {`${isConnected}`}</p>
            <p>is Connecting {`${isConnecting}`}</p>
            <p>is Speaking {`${isSpeaking}`}</p>
            <pre>{JSON.stringify(transcript, null, 2)}</pre>
    </div>
    


  ) 
}

