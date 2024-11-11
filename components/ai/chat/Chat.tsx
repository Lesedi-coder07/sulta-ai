import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
const message_1 = {
    sender: 'user',
    message: 'Hello, how are you?'
}

function Chat({agent}: {agent: any}) {
    const [message, setMessage] = useState(''); 
    const [messages, setMessages] = useState<string[]>([]);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Form submitted')
        setMessages([...messages, message])
    }
  return (
        // Start of Selection
        <div className="flex flex-col h-screen w-screen bg-white dark:bg-gray-800">
          <header className="flex items-center justify-between p-6 bg-gray-100 dark:bg-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{agent.name}</h2>
          </header>
          <div className="flex-1 p-6 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className="mb-4">
                <Card className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
                  <CardContent>
                    <p className="text-gray-800 dark:text-white">{message}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex p-6 bg-gray-100 dark:bg-gray-700">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 mr-4"
            />
            <Button type="submit" variant="default">
              Send
            </Button>
          </form>
        </div>
  )
}

export default Chat
