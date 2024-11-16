"use client";

import { useState, useEffect } from "react";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { Message } from "@/types/chat";
import { auth, db } from '@/app/api/firebase/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface Agent {
    isPublic: boolean;
    ownerID: string;
}


export function ChatInterface({ agent_id }: { agent_id: string }) {
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    const [exists, setExists] = useState<false | true>(true);
    const [agent, setAgent] = useState<Agent | null >(null);


    useEffect( ()  => {
        async function checkAgent() {
            const agentRef = doc(db, 'agents', agent_id)
            let snapshot = await getDoc(agentRef)
            if(snapshot.exists()) {
                setExists(true)
                setAgent(snapshot.data() as Agent)
                if (agent?.isPublic == false) {
                    if (agent.ownerID != currentUser) {
                       setExists(false)
                    }
                }
            } else {
                setExists(false)
            }
        }


        checkAgent()
    
    })



    const [messages, setMessages] = useState<Message[]>([
        // {
        //     id: "1",
        //     role: "assistant",
        //     content: "Hello! How can I assist you today?",
        //     timestamp: "just now",
        // },
    ]);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user.email);
            } else {
                setCurrentUser(null);
            }
        })
        return () => unsubscribe()
    }, []);




    const handleSendMessage = async (content: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content,
            timestamp: "just now",
        };
        setMessages((prev) => [...prev, userMessage]);
    
        try {
            const response = await fetch('/api/LLM/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    previousMessages: messages,
                    currentUser: auth.currentUser?.displayName,
                    prompt: content
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to get AI response');
            }
    
            const aiMessage = await response.json();
            
            setMessages((prev) => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: aiMessage.content,
                timestamp: "just now",
            }]);
    
        } catch (error) {
            console.error(error);
            // You might want to show an error message to the user here
        }
        
       
    };


    return (

        exists ?   (<div className="flex h-screen flex-col bg-neutral-50 dark:bg-neutral-900">
            <ChatHeader agent={agent} />
            <ChatMessages messages={messages} />
            <ChatInput onSendMessage={handleSendMessage} />
        </div> ) : <h1 className="text-center text-2xl">Agent not found</h1>
    );
      
}