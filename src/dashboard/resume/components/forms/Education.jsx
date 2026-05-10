import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { LoaderCircle, Plus, Trash2, GraduationCap, Calendar, Sparkles } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'

function Education() {

  const [educationalList,setEducationalList]=useState([
    {
      universityName:'',
      degree:'',
      major:'',
      startDate:'',
      endDate:'',
      description:''
    }
  ])
  useParams();
  const [loading,setLoading]=useState(false);
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);

  useEffect(()=>{
    if(resumeInfo?.education?.length > 0) {
        setEducationalList(resumeInfo.education)
    }
  },[resumeInfo?.documentId])

  const handleChange=(event,index)=>{
    const newEntries=educationalList.slice();
    const {name,value}=event.target;
    newEntries[index][name]=value;
    setEducationalList(newEntries);
  }

  const AddNewEducation=()=>{
    setEducationalList([...educationalList,
      {
        universityName:'',
        degree:'',
        major:'',
        startDate:'',
        endDate:'',
        description:''
      }
    ])
  }

  const RemoveEducation=(index)=>{
    const newList = educationalList.filter((_, i) => i !== index);
    setEducationalList(newList);
  }

  const onSave=()=>{
    setLoading(true)
    const data={
      data:{
        education:educationalList
      }
    }

    GlobalApi.UpdateResumeDetail(resumeInfo?.documentId,data).then(resp=>{
      setLoading(false);
      toast('Education updated successfully.')
    },(error)=>{
      setLoading(false);
      toast('Failed to save education.')
    })
  }

  useEffect(()=>{
    setResumeInfo({
      ...resumeInfo,
      education:educationalList
    })
  },[educationalList])

  return (
    <div className='flex flex-col gap-6'>
        <div className='ats-card p-8'>
            <div className='mb-8'>
                <h2 className='text-2xl font-bold text-slate-900'>Education</h2>
                <p className='text-slate-500 mt-1'>Add your academic background and certifications.</p>
            </div>

            <div className='space-y-8'>
                {educationalList.map((item,index)=>(
                    <div key={index} className='relative p-6 border border-slate-100 rounded-2xl bg-slate-50/30'>
                        {educationalList.length > 1 && (
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => RemoveEducation(index)}
                                className="absolute top-4 right-4 h-8 w-8 text-slate-400 hover:text-destructive hover:bg-destructive/5">
                                <Trash2 className='h-4 w-4' />
                            </Button>
                        )}

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='md:col-span-2 space-y-2'>
                                <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                                    <GraduationCap className='h-3 w-3' /> University / School Name
                                </label>
                                <Input name="universityName" 
                                    value={item.universityName}
                                    placeholder="e.g. Stanford University"
                                    onChange={(e)=>handleChange(e,index)}
                                    className="h-11 border-slate-200 bg-white"
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>Degree</label>
                                <Input name="degree" 
                                    value={item.degree}
                                    placeholder="e.g. Bachelor's"
                                    onChange={(e)=>handleChange(e,index)}
                                    className="h-11 border-slate-200 bg-white"
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>Major / Field of Study</label>
                                <Input name="major" 
                                    value={item.major}
                                    placeholder="e.g. Computer Science"
                                    onChange={(e)=>handleChange(e,index)}
                                    className="h-11 border-slate-200 bg-white"
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                                    <Calendar className='h-3 w-3' /> Start Date
                                </label>
                                <Input type="date" name="startDate" 
                                    value={item.startDate}
                                    onChange={(e)=>handleChange(e,index)}
                                    className="h-11 border-slate-200 bg-white"
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                                    <Calendar className='h-3 w-3' /> End Date
                                </label>
                                <Input type="date" name="endDate" 
                                    value={item.endDate}
                                    onChange={(e)=>handleChange(e,index)}
                                    className="h-11 border-slate-200 bg-white"
                                />
                            </div>
                            <div className='md:col-span-2 space-y-2'>
                                <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>Description (Optional)</label>
                                <Textarea name="description" 
                                    value={item.description}
                                    onChange={(e)=>handleChange(e,index)}
                                    placeholder="Relevant coursework, GPA, etc."
                                    className="min-h-[100px] border-slate-200 bg-white"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='mt-8 flex flex-col sm:flex-row justify-between gap-4'>
                <Button variant="outline" onClick={AddNewEducation} className="gap-2 border-primary text-primary font-bold hover:bg-primary/5">
                    <Plus className='h-4 w-4' /> Add Education
                </Button>
                
                <Button disabled={loading} onClick={()=>onSave()} className="bg-primary hover:bg-primary/90 px-10 shadow-md">
                    {loading ? <LoaderCircle className='animate-spin h-4 w-4' /> : 'Save Education'}    
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Education