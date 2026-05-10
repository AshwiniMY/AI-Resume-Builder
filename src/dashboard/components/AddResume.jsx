import { Loader2, Plus, Briefcase, FileText } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function AddResume() {
    const [openDialog,setOpenDialog]=useState(false)
    const [resumeTitle,setResumeTitle]=useState('');
    const [jobRole,setJobRole]=useState('');
    const [jobDescription,setJobDescription]=useState('');
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const navigation=useNavigate();

    const onCreate=async()=>{
        if(!jobRole.trim()) {
            toast("Please enter a Job Role to get AI-tailored content.");
            return;
        }
        setLoading(true)
        const uuid=uuidv4();
        const data={
            data:{
                title:resumeTitle,
                resumeId:uuid,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                userName:user?.fullName,
                jobRole:jobRole,
                jobDescription:jobDescription,
            }
        }

        GlobalApi.CreateNewResume(data).then(resp=>{
            if(resp) {
                setLoading(false);
                setOpenDialog(false);
                setResumeTitle('');
                setJobRole('');
                setJobDescription('');
                navigation('/dashboard/resume/'+resp.data.data.documentId+"/edit");
            }
        },(error)=>{
            setLoading(false);
            toast("Error creating resume. Please try again.");
        })
    }

    return (
        <div>
            <div className='group h-[240px] rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-14 flex flex-col items-center justify-center gap-3 transition-all hover:border-primary/50 hover:bg-primary/5 cursor-pointer'
                onClick={()=>setOpenDialog(true)}>
                <div className='p-3 rounded-full bg-white shadow-sm group-hover:scale-110 transition-transform'>
                    <Plus className='h-8 w-8 text-slate-400 group-hover:text-primary' />
                </div>
                <span className='text-sm font-bold text-slate-500 group-hover:text-primary uppercase tracking-wider'>Create New Resume</span>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">New Resume</DialogTitle>
                        <DialogDescription className="text-slate-500">
                            Enter the Job Role and paste the Job Description so the AI can tailor your resume to perfectly match the job.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className='my-4 space-y-5'>
                        {/* Resume Title */}
                        <div className='space-y-2'>
                            <label className='text-xs font-bold uppercase tracking-widest text-slate-400'>Resume Title</label>
                            <Input 
                                placeholder="e.g. My Google Application"
                                className="h-11 border-slate-200 focus:ring-primary"
                                value={resumeTitle}
                                onChange={(e)=>setResumeTitle(e.target.value)}
                            />
                        </div>

                        {/* Job Role */}
                        <div className='space-y-2'>
                            <label className='text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                                <Briefcase className='h-3 w-3' /> Target Job Role *
                            </label>
                            <Input 
                                placeholder="e.g. Frontend Developer, Data Analyst"
                                className="h-11 border-slate-200 focus:ring-primary"
                                value={jobRole}
                                onChange={(e)=>setJobRole(e.target.value)}
                            />
                            <p className='text-[10px] text-slate-400'>Required. The AI uses this to generate targeted content.</p>
                        </div>

                        {/* Job Description */}
                        <div className='space-y-2'>
                            <label className='text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                                <FileText className='h-3 w-3' /> Paste Job Description (Optional but Recommended)
                            </label>
                            <Textarea 
                                placeholder="Paste the full job description from the company's job posting here..."
                                className="min-h-[120px] border-slate-200 focus:ring-primary text-sm leading-relaxed"
                                value={jobDescription}
                                onChange={(e)=>setJobDescription(e.target.value)}
                            />
                            <p className='text-[10px] text-slate-400'>Pasting the JD makes the AI inject the exact keywords the company's ATS is looking for, dramatically increasing your match score.</p>
                        </div>
                    </div>

                    <div className='flex justify-end gap-3'>
                        <Button onClick={()=>setOpenDialog(false)} variant="ghost" className="text-slate-500">Cancel</Button>
                        <Button 
                            className="bg-primary hover:bg-primary/90 text-white px-8"
                            disabled={!resumeTitle.trim() || !jobRole.trim() || loading}
                            onClick={()=>onCreate()}>
                            {loading? <Loader2 className='animate-spin h-4 w-4' /> : 'Create & Target Resume'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddResume