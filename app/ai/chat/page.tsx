'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Chat from '@/components/ai/chat/Chat'



let currentAgent = {
    name: "Agent 1",
    type: 'Text',
    status: 'Online',
    private: true,
    agent_unique_name: 'agent_1',
    icon: <Image src={'/icon.png'} alt='agent_1' width={50} height={50} />
}
function ChatUI() {
    const [agent, setAgent] = useState(currentAgent)
    // const router = useRouter()
    // const {slug} = router.query;
  return (
    <div>
      {agent ? (<Chat agent={agent} />) : (<div>Loading...</div>)}
    </div>
  )
}

export default ChatUI
