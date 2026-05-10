import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle, User, Briefcase, Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function PersonalDetail({enabledNext}) {

    useParams();
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)

    const [formData,setFormData]=useState({
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        email: '',
        linkedin: '',
        github: '',
        portfolio: '',
    });
    const [loading,setLoading]=useState(false);

    useEffect(() => {
        if(resumeInfo) {
            setFormData({
                firstName: resumeInfo?.firstName || '',
                lastName: resumeInfo?.lastName || '',
                address: resumeInfo?.address || '',
                phone: resumeInfo?.phone || '',
                email: resumeInfo?.email || '',
                linkedin: resumeInfo?.linkedin || '',
                github: resumeInfo?.github || '',
                portfolio: resumeInfo?.portfolio || '',
            })
        }
    }, [resumeInfo?.documentId]) // Only run when a new resume is loaded or documentId is first available

    const handleInputChange=(e)=>{
        enabledNext(false)
        const {name,value}=e.target;

        setFormData(prev => ({
            ...prev,
            [name]:value
        }))
        setResumeInfo({
            ...resumeInfo,
            [name]:value
        })
    }

    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true)
        const data={
            data:formData
        }
        GlobalApi.UpdateResumeDetail(resumeInfo?.documentId,data).then(resp=>{
            enabledNext(true);
            setLoading(false);
            toast("Personal details saved.")
        },(error)=>{
            setLoading(false);
            toast("Failed to save. Try again.")
        })
    }

  return (
    <div className='ats-card p-8'>
        <div className='mb-8'>
            <h2 className='text-2xl font-bold text-slate-900'>Personal Details</h2>
            <p className='text-slate-500 mt-1'>Start with your basic information to help recruiters reach you.</p>
        </div>

        <form onSubmit={onSave}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                    <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                        <User className='h-3 w-3' /> First Name
                    </label>
                    <Input name="firstName" value={formData.firstName} required onChange={handleInputChange} className="h-11 border-slate-200" />
                </div>
                <div className='space-y-2'>
                    <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                        <User className='h-3 w-3' /> Last Name
                    </label>
                    <Input name="lastName" value={formData.lastName} required onChange={handleInputChange} className="h-11 border-slate-200" />
                </div>

                <div className='md:col-span-2 space-y-2'>
                    <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                        <MapPin className='h-3 w-3' /> Address
                    </label>
                    <Input name="address" value={formData.address} required onChange={handleInputChange} className="h-11 border-slate-200" />
                </div>
                <div className='space-y-2'>
                    <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                        <Phone className='h-3 w-3' /> Phone
                    </label>
                    <Input name="phone" value={formData.phone} required onChange={handleInputChange} className="h-11 border-slate-200" />
                </div>
                <div className='space-y-2'>
                    <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                        <Mail className='h-3 w-3' /> Email
                    </label>
                    <Input name="email" value={formData.email} required onChange={handleInputChange} className="h-11 border-slate-200" />
                </div>

                <div className='space-y-2'>
                    <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                        <Linkedin className='h-3 w-3' /> LinkedIn URL
                    </label>
                    <Input name="linkedin" value={formData.linkedin} placeholder="linkedin.com/in/username" onChange={handleInputChange} className="h-11 border-slate-200" />
                </div>
                <div className='space-y-2'>
                    <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                        <Github className='h-3 w-3' /> Github URL
                    </label>
                    <Input name="github" value={formData.github} placeholder="github.com/username" onChange={handleInputChange} className="h-11 border-slate-200" />
                </div>
                <div className='md:col-span-2 space-y-2'>
                    <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                        <Globe className='h-3 w-3' /> Portfolio URL
                    </label>
                    <Input name="portfolio" value={formData.portfolio} placeholder="portfolio-site.com" onChange={handleInputChange} className="h-11 border-slate-200" />
                </div>
            </div>

            <div className='mt-8 flex justify-end'>
                <Button type="submit" size="lg" className="px-10 h-12 bg-primary hover:bg-primary/90 shadow-md font-bold"
                disabled={loading}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save Details'}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default PersonalDetail