import { ChatInterface } from "@/components/ai/chat/chat-interface";

import Head from "next/head";

export default function ChatPage({params}: {params: {slug: string}}) {

  return( 
    <>
    <Head>
        <title>{params.slug ? params.slug : 'Loading'  }</title>
    </Head>
      <ChatInterface />
    </>
  


);
}