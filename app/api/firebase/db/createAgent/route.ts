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
        const { db } = await import("../../firebaseConfig");
        const { doc, setDoc, updateDoc, arrayUnion } = await import("firebase/firestore");

        // Create new agent document
        const agentRef = doc(db, 'agents', data.name);
        const agentData = {
            ...data,
            systemMessage,
            createdBy: currentUser.uid,
            createdAt: new Date().toISOString()
        };
        
        await setDoc(agentRef, agentData);

        // Update user's agents array
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, {
            Agents: arrayUnion(data.name)
        });

        return NextResponse.json({ 
            message: "Agent created successfully",
            agentId: data.name 
        });

    } catch (error) {
        console.error("Error creating agent: SS", error);
        return NextResponse.json(
            { error: "Failed to create agent" },
            { status: 500 }
        );
    }
}
