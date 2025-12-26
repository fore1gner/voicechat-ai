import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
}

export function useVapi() {
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(() => {

        //only for testing API, customers will add their own api keys etc
        const vapiInstance = new Vapi("83bb3bd6-4362-4272-9e4c-1d37832576aa"); 
        setVapi(vapiInstance);

        vapiInstance.on("call-start", () => {
            setIsConnected(true);
            setIsConnecting(false);
            setTranscript([]);
        });

        vapiInstance.on("call-end", () => {
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        });

        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true);
        });

        vapiInstance.on("speech-end", () => {
            setIsSpeaking(false);
        });

        vapiInstance.on("error", (error) => {
            console.log(error,"VAPI_ERROR");
            setIsConnecting(false);
        });

        vapiInstance.on("message", (message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                setTranscript((prev) => [...prev, { 
                    role: message.role === "user" ? "user" : "assistant", 
                    text: message.transcript 
                }]);
            }
        });

        return () => {
            vapiInstance?.stop();
        };
    }, []);

    const startCall = async () => {
        setIsConnecting(true);

        if (vapi) {
            vapi.start("cbeed91d-7254-406e-ad67-6a5f9e30e58c"); //test bot API WILL BE CHANGED CUSTOMER API
        }
    };

    const endCall = () => {
        vapi?.stop();
    };
    
    return {
        isConnected,
        isConnecting,
        isSpeaking,
        transcript,
        startCall,
        endCall,
    };
};