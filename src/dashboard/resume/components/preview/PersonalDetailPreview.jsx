import React from 'react'
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'

function PersonalDetailPreview({resumeInfo}) {
  return (
    <div className='mb-6'>
        <div className='flex flex-col items-center mb-4'>
            <h1 className='font-bold text-3xl tracking-tight text-slate-900 mb-1'>
                {resumeInfo?.firstName} {resumeInfo?.lastName}
            </h1>
            <h2 className='text-lg font-semibold text-primary mb-3 uppercase tracking-wider'>
                {resumeInfo?.jobTitle}
            </h2>
            
            <div className='flex flex-wrap justify-center gap-y-2 gap-x-4 text-[10px] text-slate-600 font-medium'>
                {resumeInfo?.phone && (
                    <div className='flex items-center gap-1'>
                        <Phone className='h-3 w-3 text-primary' />
                        {resumeInfo?.phone}
                    </div>
                )}
                {resumeInfo?.email && (
                    <div className='flex items-center gap-1'>
                        <Mail className='h-3 w-3 text-primary' />
                        {resumeInfo?.email}
                    </div>
                )}
                {resumeInfo?.address && (
                    <div className='flex items-center gap-1'>
                        <MapPin className='h-3 w-3 text-primary' />
                        {resumeInfo?.address}
                    </div>
                )}
            </div>

            {/* Social Links Row */}
            <div className='mt-2 flex flex-wrap justify-center gap-4 text-[10px] text-slate-600 font-medium'>
                 {resumeInfo?.linkedin && (
                    <div className='flex items-center gap-1'>
                        <Linkedin className='h-3 w-3 text-primary' />
                        <span>linkedin.com/in/{resumeInfo.linkedin.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, '').replace(/\/$/, '')}</span>
                    </div>
                )}
                {resumeInfo?.github && (
                    <div className='flex items-center gap-1'>
                        <Github className='h-3 w-3 text-primary' />
                        <span>github.com/{resumeInfo.github.replace(/https?:\/\/(www\.)?github\.com\//, '').replace(/\/$/, '')}</span>
                    </div>
                )}
                {resumeInfo?.portfolio && (
                    <div className='flex items-center gap-1'>
                        <Globe className='h-3 w-3 text-primary' />
                        <span>{resumeInfo.portfolio.replace(/https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
                    </div>
                )}
            </div>
        </div>
        
        <div className='h-[2px] w-full bg-slate-100' 
            style={{ backgroundColor: resumeInfo?.themeColor + '20' }} 
        />
    </div>
  )
}

export default PersonalDetailPreview