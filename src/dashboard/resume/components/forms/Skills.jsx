import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { LoaderCircle, Plus, Trash2, Code, Sparkles, CheckCircle2 } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { AIChatSession } from './../../../../../service/AIModal'

const PROMPT = 'Job Title: {jobTitle}. Provide a list of 10-15 top technical skills for this role as a JSON array of strings under the key "skills".';

function Skills() {

    const [skillsList,setSkillsList]=useState([{
        name:''
    }])
    const {resumeId}=useParams();

    const [loading,setLoading]=useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
   
    useEffect(()=>{
        if(resumeInfo?.skills?.length > 0) {
            setSkillsList(resumeInfo.skills)
        }
    },[resumeInfo])
   
    const handleChange=(index,name,value)=>{
        const newEntries=skillsList.slice();
        newEntries[index][name]=value;
        setSkillsList(newEntries);
    }

    const AddNewSkills=()=>{
        setSkillsList([...skillsList,{
            name:''
        }])
    }
    
    const RemoveSkills=(index)=>{
        const newList = skillsList.filter((_, i) => i !== index);
        setSkillsList(newList);
    }

    const GenerateSkillsFromAI = async () => {
        if(!resumeInfo?.jobTitle) {
            toast('Please enter a Job Title in Personal Details first');
            return;
        }
        setAiLoading(true);
        const prompt = PROMPT.replace('{jobTitle}', resumeInfo.jobTitle);
        try {
            const result = await AIChatSession.sendMessage(prompt);
            const text = result.response.text();
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                const newSkills = parsed.skills.map(skill => ({ name: skill }));
                // Combine with existing non-empty skills
                const combined = [...skillsList.filter(s => s.name), ...newSkills];
                // Remove duplicates
                const unique = Array.from(new Set(combined.map(s => s.name)))
                    .map(name => ({ name }));
                setSkillsList(unique);
                toast('Skills suggested by AI');
            }
        } catch (error) {
            if(error.message.includes('429')) {
                toast("AI is busy. Please wait 1 minute and try again.");
            } else {
                toast("Failed to generate skill suggestions");
            }
        } finally {
            setAiLoading(false);
        }
    }

    const onSave=()=>{
        setLoading(true);
        const data={
            data:{
                skills:skillsList
            }
        }

        GlobalApi.UpdateResumeDetail(resumeInfo?.documentId,data)
        .then(resp=>{
            setLoading(false);
            toast('Skills updated successfully.')
        },(error)=>{
            setLoading(false);
            toast('Failed to save skills.')
        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            skills:skillsList
        })
    },[skillsList])

  return (
    <div className='flex flex-col gap-6'>
        <div className='ats-card p-8'>
            <div className='mb-8 flex justify-between items-start'>
                <div>
                    <h2 className='text-2xl font-bold text-slate-900'>Skills</h2>
                    <p className='text-slate-500 mt-1'>Add your top professional key skills and technologies.</p>
                </div>
                <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={aiLoading}
                    onClick={GenerateSkillsFromAI}
                    className="gap-2 text-primary border-primary font-bold hover:bg-primary/5">
                    {aiLoading ? <LoaderCircle className='h-4 w-4 animate-spin' /> : <Sparkles className='h-4 w-4' />} AI Suggestions
                </Button>
            </div>

            <div className='flex flex-wrap gap-4'>
                {skillsList?.map((item,index)=>(
                    <div key={index} className='flex items-center gap-2 p-2 px-3 border border-slate-200 rounded-xl bg-slate-50/50 group hover:border-primary/30 transition-all'>
                        <Code className='h-3 w-3 text-slate-400 group-hover:text-primary' />
                        <input 
                            className="bg-transparent border-none outline-none text-sm font-medium text-slate-700 placeholder:text-slate-300 w-32"
                            placeholder="e.g. React"
                            value={item.name}
                            onChange={(e)=>handleChange(index,'name',e.target.value)} 
                        />
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => RemoveSkills(index)}
                            className="h-6 w-6 text-slate-300 hover:text-destructive hover:bg-transparent">
                            <Trash2 className='h-3 w-3' />
                        </Button>
                    </div>
                ))}
                
                <Button variant="ghost" onClick={AddNewSkills} className="h-10 px-4 gap-2 border-2 border-dashed border-slate-200 text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-primary/5 rounded-xl">
                    <Plus className='h-4 w-4' /> Add Skill
                </Button>
            </div>

            <div className='mt-10 flex justify-end'>
                <Button disabled={loading} onClick={()=>onSave()} className="bg-primary hover:bg-primary/90 px-10 shadow-md">
                    {loading?<LoaderCircle className='animate-spin h-4 w-4' />:'Save Skills'}    
                </Button>
            </div>
        </div>

        <div className='ats-card p-6 bg-blue-50 border-blue-100'>
             <h3 className='font-bold text-slate-900 flex items-center gap-2 mb-3'>
                <CheckCircle2 className='h-4 w-4 text-blue-500' /> ATS Keyword Optimization
            </h3>
            <p className='text-sm text-slate-600'>
                Applicant Tracking Systems (ATS) scan for specific keywords. Make sure to include technologies and skills mentioned in the job description.
            </p>
        </div>
    </div>
  )
}

export default Skills