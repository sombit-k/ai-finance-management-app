import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { LayoutDashboard, PenBox } from 'lucide-react';



const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
            <nav className="container mx-auto py-4 px-2  flex items-center justify-between">
                <Link href="/">
                    <Image
                        src={"/logo.png"}
                        alt="Welth Logo"
                        width={100}
                        height={100}
                        className="h-20 w-auto object-contain md:h-16"
                    />
                    
                </Link>

                {/* Navigation Links - Different for signed in/out users */}
                <div className="hidden md:flex items-center space-x-8">
                    <SignedOut>
                        <a href="#features" className="text-gray-600 hover:text-blue-600">
                            Features
                        </a>
                        <a
                            href="#testimonials"
                            className="text-gray-600 hover:text-blue-600"
                        >
                            Testimonials
                        </a>
                    </SignedOut>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                    <SignedIn>
                        <Link
                            href="/dashboard"
                            className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
                        >
                            <Button variant="outline">
                                <LayoutDashboard size={18} />
                                <span className="hidden md:inline">Dashboard</span>
                            </Button>
                        </Link>
                        <a href="/transaction/create">
                            <Button className="flex items-center gap-2">
                                <PenBox size={18} />
                                <span className="hidden md:inline">Add Transaction</span>
                            </Button>
                        </a>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton forceRedirectUrl="/dashboard" mode="modal">
                            <Button variant="outline">Login</Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10",
                                },
                            }}

                        />
                    </SignedIn>
                </div>
            </nav>
        </header>
  )
}

export default Header