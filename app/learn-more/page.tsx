import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import React from 'react'
import Image from 'next/image'
import { ArrowBigDown, ArrowBigDownDashIcon , ArrowDown} from 'lucide-react'
import { GradientText } from '@/components/ui/gradient-text'

function LearnMorePage() {
    return (
        <div>
            <Navbar />
            <main className='container mx-auto'>
                <header className='flex flex-col items-center justify-center h-screen'>
                    <h1 className='text-4xl font-bold text-center'>Sulta AI - AI Redefined</h1>
                    <p className='text-lg text-gray-500 text-center'>You no longer need to be a tech expert to create AI.</p>
                    

                    <div className='flex flex-col items-center justify-center mt-[100px]'>
                        <ArrowDown className='w-10 h-20  ' />
                        <p className='text-lg text-gray-500 text-center'>Scroll down to learn more</p>
                    </div>

                </header>
                <section className='flex flex-col items-center justify-around'>

                    <div className='flex flex-col items-center justify-left mb-20'>
                        <h2 className='text-2xl font-bold text-center'>What can you do with <GradientText>Sulta AI?</GradientText> </h2>
                        <p className='text-lg text-gray-500 text-center'>The possibilities are endless. </p>
                    </div>
                    <div className='flex flex-row  justify-around gap-4 flex-wrap'>

                        <Image className='rounded-lg lg:mx-3 mx-auto' src="/ai-thumb.jpg" alt="Dashboard ui design" priority 
                        width={350} height={350} />
                        <ul className='list-disc list-inside text-md sm:mt-2 sm:mx-auto'>
                            <h1 className='text-lg font-bold'>With Sulta AI you can:</h1>
                            <li className='mt-2'>Create marketing content automatically</li>
                            <li className='mt-2'>Handle customer conversations</li>
                            <li className='mt-2'>Screen job applications efficiently</li>
                            <li className='mt-2'>Solve complex academic problems</li>
                            <li className='mt-2'>Generate personalized plans and recommendations</li>
                            <li className='mt-2'>Automate customer support tasks</li>

                        </ul>


                    </div>

                </section>
            </main>
            <Footer />
        </div>
    )
}

export default LearnMorePage
