import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle, Briefcase, Sparkles, Target } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function TargetJob({enabledNext}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [loading,setLoading]=useState(false);
    const [formData,setFormData]=useState({
        jobRole: '',
        jobDescription: ''
    });

    useEffect(() => {
        if(resumeInfo) {
            setFormData({
                jobRole: resumeInfo?.jobRole || '',
                jobDescription: resumeInfo?.jobDescription || ''
            })
            // If fields are already filled, enable next
            if(resumeInfo.jobRole) enabledNext(true)
        }
    }, [resumeInfo])

    const handleInputChange=(e)=>{
        enabledNext(false)
        const {name,value}=e.target;
        setFormData(prev => ({ ...prev, [name]:value }))
        setResumeInfo({ ...resumeInfo, [name]:value })
    }

    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true)
        const data={ data:formData }
        GlobalApi.UpdateResumeDetail(resumeInfo?.documentId,data).then(resp=>{
            enabledNext(true);
            setLoading(false);
            toast("Target job details saved.")
        },(error)=>{
            setLoading(false);
            toast("Failed to save. Try again.")
        })
    }

    return (
        <div className='ats-card p-8 bg-primary/5 border-primary/20'>
            <div className='mb-8'>
                <div className='flex items-center gap-3 mb-2'>
                    <div className='p-2 bg-primary rounded-lg'>
                        <Target className='h-5 w-5 text-white' />
                    </div>
                    <h2 className='text-2xl font-bold text-slate-900'>Target Job Context</h2>
                </div>
                <p className='text-slate-500'>Enter the role you are applying for and the job description. This helps our AI tailor your resume content perfectly.</p>
            </div>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-1 gap-6'>
                    <div className='space-y-2'>
                        <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                            <Briefcase className='h-3 w-3' /> Target Job Role
                        </label>
                        <Input name="jobRole" 
                            placeholder="e.g. Senior Frontend Developer"
                            value={formData.jobRole} 
                            required 
                            onChange={handleInputChange} 
                            className="h-12 border-slate-200 bg-white" 
                        />
                    </div>
                    
                    <div className='space-y-2'>
                        <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                            <Sparkles className='h-3 w-3' /> Job Description (JD)
                        </label>
                        <Textarea name="jobDescription" 
                            value={formData.jobDescription} 
                            required
                            placeholder="Paste the job description here..." 
                            onChange={handleInputChange} 
                            className="min-h-[250px] border-slate-200 bg-white leading-relaxed" 
                        />
                    </div>
                </div>

                <div className='mt-8 flex justify-end'>
                    <Button type="submit" size="lg" className="px-10 h-12 bg-primary hover:bg-primary/90 shadow-md font-bold"
                    disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save & Set Context'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default TargetJob
