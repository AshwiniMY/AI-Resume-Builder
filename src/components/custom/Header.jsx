import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
    const { user, isSignedIn } = useUser();
    return (
        <header className='sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md'>
            <div className='container flex h-16 items-center justify-between px-4 md:px-8'>
                <Link to={'/'} className='flex items-center gap-2'>
                    <img src='/logo.svg' alt="ATS Resume" width={32} height={32} />
                    <span className='text-xl font-bold tracking-tight text-slate-900 hidden sm:inline-block'>ATS<span className='text-primary'>Resume</span></span>
                </Link>

                <nav className='flex items-center gap-4 md:gap-6'>
                    {isSignedIn ? (
                         <div className='flex gap-3 items-center'>
                            <Link to={'/'}>
                                <Button variant="ghost" className="text-slate-600 hover:text-primary">Home</Button>
                            </Link>
                            <Link to={'/dashboard'}>
                                <Button variant="ghost" className="text-slate-600 hover:text-primary">Dashboard</Button>
                            </Link>
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    ) : (
                        <div className='flex items-center gap-3'>
                            <Link to={'/auth/sign-in'}>
                                <Button variant="ghost" className="text-slate-600 hover:text-primary">Sign In</Button>
                            </Link>
                            <Link to={'/auth/sign-in'}>
                                <Button className="bg-primary hover:bg-primary/90 text-white shadow-md font-semibold">Get Started</Button>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header