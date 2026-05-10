import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { LoaderCircle, Briefcase, Plus, Trash2, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react'

function Experience() {
    const [experinceList,setExperinceList]=useState([]);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    useParams();
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        if(resumeInfo?.experience?.length > 0) {
            setExperinceList(resumeInfo.experience)
        } else if (experinceList.length === 0) {
            setExperinceList([{
                title:'',
                companyName:'',
                city:'',
                state:'',
                startDate:'',
                endDate:'',
                workSummary:'',
                currentlyWorking: false
            }]);
        }
    },[resumeInfo?.documentId])

    const handleChange=(index,event)=>{
        const newEntries=experinceList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
        setExperinceList(newEntries);
    }

    const AddNewExperience=()=>{
        setExperinceList([...experinceList,{
            title:'',
            companyName:'',
            city:'',
            state:'',
            startDate:'',
            endDate:'',
            workSummary:'',
            currentlyWorking: false
        }])
    }

    const RemoveExperience=(index)=>{
        const newList = experinceList.filter((_, i) => i !== index);
        setExperinceList(newList);
    }

    const handleRichTextEditor=(e,name,index)=>{
        const newEntries=experinceList.slice();
        newEntries[index][name]=e.target.value;
        setExperinceList(newEntries);
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            experience:experinceList
        });
    },[experinceList]);

    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                experience:experinceList
            }
        }

        GlobalApi.UpdateResumeDetail(resumeInfo?.documentId,data).then(res=>{
            setLoading(false);
            toast('Experience details saved successfully.')
        },(error)=>{
            setLoading(false);
            toast('Failed to save experience.')
        })
    }

  return (
    <div className='flex flex-col gap-6'>
        <div className='ats-card p-8'>
            <div className='mb-8'>
                <h2 className='text-2xl font-bold text-slate-900'>Professional Experience</h2>
                <p className='text-slate-500 mt-1'>Add your work history. Use measurable achievements and strong action verbs.</p>
            </div>

            <div className='space-y-8'>
                {experinceList?.map((item,index)=>(
                    <div key={index} className='relative p-6 border border-slate-100 rounded-2xl bg-slate-50/30'>
                        {experinceList.length > 1 && (
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => RemoveExperience(index)}
                                className="absolute top-4 right-4 h-8 w-8 text-slate-400 hover:text-destructive hover:bg-destructive/5">
                                <Trash2 className='h-4 w-4' />
                            </Button>
                        )}

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                                    <Briefcase className='h-3 w-3' /> Position Title
                                </label>
                                <Input name="title" 
                                    value={item.title}
                                    placeholder="e.g. Software Engineer"
                                    onChange={(event)=>handleChange(index,event)}
                                    className="h-11 border-slate-200 bg-white"
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                                    <Briefcase className='h-3 w-3' /> Company Name
                                </label>
                                <Input name="companyName" 
                                    value={item.companyName}
                                    placeholder="e.g. Google"
                                    onChange={(event)=>handleChange(index,event)}
                                    className="h-11 border-slate-200 bg-white"
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                                    <MapPin className='h-3 w-3' /> City
                                </label>
                                <Input name="city" 
                                    value={item.city}
                                    onChange={(event)=>handleChange(index,event)} 
                                    className="h-11 border-slate-200 bg-white"
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                                    <MapPin className='h-3 w-3' /> State
                                </label>
                                <Input name="state" 
                                    value={item.state}
                                    onChange={(event)=>handleChange(index,event)}
                                    className="h-11 border-slate-200 bg-white"
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                                    <Calendar className='h-3 w-3' /> Start Date
                                </label>
                                <Input type="date"  
                                    name="startDate" 
                                    value={item.startDate}
                                    onChange={(event)=>handleChange(index,event)} 
                                    className="h-11 border-slate-200 bg-white"
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                                    <Calendar className='h-3 w-3' /> End Date
                                </label>
                                <Input type="date" name="endDate" 
                                    value={item.endDate}
                                    disabled={item?.currentlyWorking}
                                    onChange={(event)=>handleChange(index,event)} 
                                    className="h-11 border-slate-200 bg-white"
                                />
                            </div>
                            
                            <div className='md:col-span-2'>
                                <RichTextEditor
                                    index={index}
                                    defaultValue={item?.workSummary}
                                    onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummary',index)}  
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='mt-8 flex flex-col sm:flex-row justify-between gap-4'>
                <Button variant="outline" onClick={AddNewExperience} className="gap-2 border-primary text-primary font-bold hover:bg-primary/5">
                    <Plus className='h-4 w-4' /> Add Experience
                </Button>
                
                <Button disabled={loading} onClick={()=>onSave()} className="bg-primary hover:bg-primary/90 px-10 shadow-md">
                    {loading ? <LoaderCircle className='animate-spin h-4 w-4' /> : 'Save Experience'}    
                </Button>
            </div>
        </div>

        {/* ATS Tips Card */}
        <div className='ats-card p-6 bg-amber-50 border-amber-200'>
            <h3 className='font-bold text-slate-900 flex items-center gap-2 mb-3'>
                <Sparkles className='h-4 w-4 text-amber-500' /> ATS Pro Tips
            </h3>
            <ul className='space-y-2 text-sm text-slate-600'>
                <li className='flex gap-2'><CheckCircle2 className='h-4 w-4 text-green-500 shrink-0' /> Use measurable achievements (e.g., "Increased sales by 20%").</li>
                <li className='flex gap-2'><CheckCircle2 className='h-4 w-4 text-green-500 shrink-0' /> Start every bullet point with a strong action verb.</li>
                <li className='flex gap-2'><CheckCircle2 className='h-4 w-4 text-green-500 shrink-0' /> Mention tools and technologies naturally in your descriptions.</li>
            </ul>
        </div>
    </div>
  )
}

export default Experience