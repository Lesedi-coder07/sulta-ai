import Navbar from '@/components/layout/Navbar'
import React from 'react'

function WaitlistPage() {
  return (
    <div>
      <Navbar />
       <main className='container mx-auto'>
         <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold text-center'>You're on the waitlist!</h1>
            <p className='text-lg text-gray-500 text-center'>We'll notify you when Sulta AI is ready</p>
         </div>
       </main>
    </div>
  )
}

export default WaitlistPage
