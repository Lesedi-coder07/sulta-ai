// import { CallInterface } from '@/components/ai/call/call-interface'
import CallInterface from "@/components/ai/call/call-interface"

export default function CallAgentPage ({params} : {params: {slug : string}}) {
    const url_data = params.slug

    return (
        <>
        
          {/* Call Interface */}
  <CallInterface />
        </>
    )
}