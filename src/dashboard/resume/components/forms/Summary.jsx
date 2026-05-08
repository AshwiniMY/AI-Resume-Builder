import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle, Sparkles, Lightbulb, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal';

const prompt="Job Title: {jobTitle}. Provide resume summaries for 3 levels: Fresher, Mid, and Senior. Return a JSON array of objects with 'summary' and 'experience_level' fields."

function Summary({enabledNext}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [summary,setSummary]=useState('');
    const [loading,setLoading]=useState(false);
    const params=useParams();
    const [aiGeneratedSummaryList,setAiGenerateSummaryList]=useState();

    useEffect(()=>{
        if(resumeInfo?.summary) {
            setSummary(resumeInfo.summary)
        }
    },[resumeInfo])

    const GenerateSummaryFromAI=async()=>{
        if(!resumeInfo?.jobTitle) {
            toast('Please enter a Job Title in Personal Details first');
            return;
        }
        setLoading(true)
        const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
        try {
            const result=await AIChatSession.sendMessage(PROMPT);
            let text = result.response.text();
            const jsonMatch = text.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
            if (jsonMatch) text = jsonMatch[0];
            text = text.replace(/,\s*([\]}])/g, '$1');

            try {
                const parsed = JSON.parse(text);
                setAiGenerateSummaryList(parsed);
            } catch (parseError) {
                console.error("JSON Parse Error:", parseError);
                toast("AI returned invalid JSON. Try again.");
            }
        } catch (error) {
            console.error(error);
            toast(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true)
        const data={ data:{ summary:summary } }
        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
            enabledNext(true);
            setLoading(false);
            toast("Summary updated successfully")
        },(error)=>{
            setLoading(false);
            toast("Failed to update summary")
        })
    }

    return (
    <div className='flex flex-col gap-6'>
        <div className='ats-card p-8'>
            <div className='mb-6 flex justify-between items-start'>
                <div>
                    <h2 className='text-2xl font-bold text-slate-900'>Professional Summary</h2>
                    <p className='text-slate-500 mt-1'>Briefly describe your career goals and key achievements.</p>
                </div>
                <Button variant="outline" 
                    disabled={loading}
                    onClick={()=>GenerateSummaryFromAI()} 
                    type="button" size="sm" className="border-primary text-primary flex gap-2 font-bold hover:bg-primary/5 shadow-sm"> 
                    {loading? <LoaderCircle className='animate-spin h-4 w-4' /> : <><Sparkles className='h-4 w-4' /> AI Assist</> }
                </Button>
            </div>

            <form onSubmit={onSave}>
                <div className='space-y-4'>
                    <div className='relative'>
                        <Textarea 
                            className="min-h-[160px] border-slate-200 focus:ring-primary p-4 leading-relaxed" 
                            required
                            placeholder="I am a highly motivated..."
                            value={summary}
                            onChange={(e)=>{
                                setSummary(e.target.value);
                                setResumeInfo({...resumeInfo, summary:e.target.value})
                            }}
                        />
                    </div>
                    
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
                            <Lightbulb className='h-3 w-3 text-amber-400' />
                            <span>Tip: Use industry keywords and action verbs.</span>
                        </div>
                        <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 px-8 shadow-md">
                            {loading ? <LoaderCircle className='animate-spin h-4 w-4' /> : 'Save Summary'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>

        {aiGeneratedSummaryList && (
            <div className='ats-card p-8 border-primary/20 bg-primary/5'>
                <h3 className='font-bold text-lg text-slate-900 flex items-center gap-2 mb-4'>
                    <Sparkles className='h-5 w-5 text-primary' /> AI Suggestions
                </h3>
                <div className='space-y-4'>
                    {aiGeneratedSummaryList?.map((item,index)=>(
                        <div key={index} 
                            onClick={()=>{
                                setSummary(item?.summary);
                                setResumeInfo({...resumeInfo, summary:item?.summary})
                            }}
                            className='p-5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-primary hover:shadow-md transition-all group relative'>
                            <div className='flex items-center justify-between mb-2'>
                                <span className='text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-slate-100 rounded text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors'>
                                    {item?.experience_level} Level
                                </span>
                                <CheckCircle2 className='h-4 w-4 text-slate-200 group-hover:text-primary' />
                            </div>
                            <p className='text-sm text-slate-600 leading-relaxed'>{item?.summary}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default Summary