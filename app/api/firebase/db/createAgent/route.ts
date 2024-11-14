import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse, NextRequest } from "next/server";


export async function POST(req: NextRequest) {

    try {
        const data = await req.json();
        
        // Form system message based on agent type and configuration
        let systemMessage = `You are an AI assistant with the following characteristics:\nName: ${data.name}\nDescription: ${data.description}\n`;
        
        if (data.type === "text") {
            systemMessage += `Personality: ${data.textConfig.personality}\n`;
            systemMessage += `Tone: ${data.textConfig.tone}\n`;
            systemMessage += `Areas of Expertise: ${data.textConfig.expertise.join(", ")}\n`;
            systemMessage += `Context Memory: ${data.textConfig.contextMemory} messages`;
        } else if (data.type === "content") {
            systemMessage += `Style: ${data.contentConfig.style}\n`;
            systemMessage += `Color Palette: ${data.contentConfig.colorPalette.join(", ")}\n`;
            systemMessage += `Resolution: ${data.contentConfig.resolution}\n`;
            systemMessage += `Aspect Ratio: ${data.contentConfig.aspectRatio}`;
        }

        // Get current user from auth
        const auth = (await import("../../firebaseConfig")).auth;
        const currentUser = auth.currentUser;

        if (!currentUser) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        } 

        // Set up Firestore references
        try {
            const { db } = await import("../../firebaseConfig");
            const { doc, setDoc, updateDoc, arrayUnion } = await import("firebase/firestore");
        } catch (error) {
            throw new Error("Failed to initialize Firestore: " + error);
        }

        // Check if agent name already exists
        let agentRef;
        let agentSnapshot;
        try {
            const { db } = await import("../../firebaseConfig");
            agentRef = doc(db, 'agents', data.name);
            agentSnapshot = await getDoc(agentRef);
        } catch (error) {
            throw new Error("Failed to check existing agent: " + error);
        }
        
        if (agentSnapshot.exists()) {
            throw new Error("An agent with this name already exists");
        }

        // Create new agent document
        const agentData = {
            ...data,
            systemMessage,
            createdBy: currentUser.uid,
            createdAt: new Date().toISOString()
        };
        
        try {
            await setDoc(agentRef, agentData);
        } catch (error: any) {
            throw new Error("Failed to create agent document: " + error.message);
        }

        // Update user's agents array
        try {
            const { db } = await import("../../firebaseConfig");
            const { doc, updateDoc, arrayUnion } = await import("firebase/firestore");
            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
                Agents: arrayUnion(data.name)
            });
        } catch (error: any) {
            // If user update fails, try to rollback agent creation
            try {
                await deleteDoc(agentRef);
            } catch (rollbackError: any) {
                console.error("Rollback failed:", rollbackError);
            }
            throw new Error("Failed to update user's agents: " + error.message);
        }

        return NextResponse.json({ 
            message: "Agent created successfully",
            agentId: data.name 
        });

    } catch (error) {
        if (error instanceof Error) {
            console.error("Error creating agent:", error);
            return NextResponse.json(
                { error: 'error.message '},
                { status: 500 }
            );
        }
        // Handle unknown errors
        console.error("Unknown error creating agent:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
