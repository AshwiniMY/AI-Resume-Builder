import React from 'react'
import { Github } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Brand & One-line Description */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <Link to="/" className='flex items-center gap-2'>
                <img src='/logo.svg' alt="ATS Resume" width={24} height={24} />
                <span className='text-md font-bold tracking-tight text-slate-900'>ATS<span className='text-primary'>Resume</span></span>
            </Link>
            <div className='hidden md:block w-[1px] h-4 bg-slate-200' />
            <p className="text-slate-500 text-sm font-medium">
              Build ATS-friendly resumes using AI.
            </p>
          </div>

          {/* Right: Compact Links */}
          <div className="flex items-center gap-6 text-sm font-bold text-slate-600">
            <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/dashboard" className="hover:text-primary transition-colors">Create Resume</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Github size={16} /> Github
            </a>
          </div>
        </div>

        {/* Bottom Bar - Closer to links */}
        <div className="mt-6 pt-6 border-t border-slate-50 flex justify-center">
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.1em]">
            © {new Date().getFullYear()} ATS Resume Builder
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
