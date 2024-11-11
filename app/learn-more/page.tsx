import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import React from 'react'
import Image from 'next/image'
import { ArrowBigDown, ArrowBigDownDashIcon } from 'lucide-react'

function LearnMorePage() {
    return (
        <div>
            <Navbar />
            <main className='container mx-auto'>
                <header className='flex flex-col items-center justify-center h-screen'>
                    <h1 className='text-4xl font-bold text-center'>Sulta AI - AI Redefined</h1>
                    <p className='text-lg text-gray-500 text-center'>You no longer need to be a tech expert to create AI.</p>
                    

                    <div className='flex flex-col items-center justify-center mt-[100px]'>
                        <ArrowBigDownDashIcon className='w-10 h-20  ' />
                        <p className='text-lg text-gray-500 text-center'>Scroll down to learn more</p>
                    </div>

                </header>
                <section className='flex flex-col items-center justify-around'>

                    <div className='flex flex-col items-center justify-left mb-20'>
                        <h2 className='text-2xl font-bold text-center'>What can you do with Sulta AI?</h2>
                        <p className='text-lg text-gray-500 text-center'>The possibilities are endless. </p>
                    </div>
                    <div className='flex flex-row  justify-around gap-2 flex-wrap'>

                        <Image className='rounded-lg mx-9' src="/ai-thumb.jpg" alt="Dashboard ui design" priority 
                        width={350} height={350} />
                        <ul className='list-disc list-inside text-md'>
                            <h1 className='text-lg font-bold'>With Sulta AI you can:</h1>
                            <li className='mt-2'>Create AI agents that create marketing content for you</li>
                            <li className='mt-2'>Create AI agents that can talk with your customers</li>
            
                            <li className='mt-2'>Create AI agents that can review job applications for you</li>
                            <li className='mt-2'>Create AI agents that can solve complex MATH/PHYSICS/CHEMISTRY problems</li>
                            <li className='mt-2'>Create AI agents that can generate personalized workout plans</li>
                            <li className='mt-2'>Create AI agents that can provide real-time language translation</li>
                            <li className='mt-2'>Create AI agents that can analyze financial data and provide insights</li>
                            <li className='mt-2'>Create AI agents that can automate your customer support</li>
              

                        </ul>


                    </div>

                </section>
            </main>
            <Footer />
        </div>
    )
}

export default LearnMorePage
