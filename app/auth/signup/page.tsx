'use client'
import React from 'react'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import { auth } from '@/app/api/firebase/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



function SignUp() {
    const [name, setName] = useState<string>('You');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }


    const handleEmailSignUp = async (e: React.ChangeEvent<HTMLFormElement>) => {

        e.preventDefault();
        setLoading(true)
        try {
            let response = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(response.user, { displayName: name })
            alert('Account Created Successfully!')
            router.push('/waitlist')
        } catch {
            return 'Error: Cannot Create Account!'
        } finally {
            setLoading(false)
        }


    }

    const handleGoogleSignUp = async () => {
        setLoading(true)
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            alert('Account Created Successfully!')
            router.push('/waitlist')
        } catch {
            return 'Error: Cannot Create Account with Google!'
        } finally {
            setLoading(false)
        }
    }



    return (
        <div>
            <Link href={"/"}>
                <Button
                    variant="ghost"
                    className="absolute left-4 top-4"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </Link>

            <div className="flex min-h-screen flex-col items-center justify-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                        <p className="text-sm text-muted-foreground">The possibilities are endless with Sulta AI</p>
                    </div>

                    <div className="grid gap-6">
                        <form className='container' onSubmit={handleEmailSignUp}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input onChange={handleNameChange} type="text" id="name" placeholder="Full name" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input onChange={handleEmailChange} type="email" id="email" placeholder="Email" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input onChange={handlePasswordChange} id="password" type="password" autoCapitalize="none" autoComplete="new-password" placeholder='Password' />
                                </div>
                                <Button type='submit' disabled={loading}>
                                    {loading ? 'Signing Up...' : 'Sign Up'}
                                </Button>
                            </div>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-[90%] mx-auto border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <Button className='mx-4' variant="outline" onClick={handleGoogleSignUp} disabled={loading}>
                            <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4"><title> {loading ? 'Signing Up...' : 'Google'}</title><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" /></svg>
                            Google
                        </Button>

                        <p className="px-8 text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp 
