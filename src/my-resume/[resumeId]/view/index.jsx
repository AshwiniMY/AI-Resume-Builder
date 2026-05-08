import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'
import { Download, Share2, Copy, Edit3, CheckCircle2, Trophy, BarChart3, ShieldCheck, Sparkles, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { AIChatSession } from './../../../../service/AIModal'

const PROMPT = 'Analyze this resume content and provide an ATS score (0-100) and 3 specific improvement suggestions. Consider the completeness of sections like Summary, Experience, Skills, Projects, and Education. If sections are missing or content is very thin, reduce the score significantly. Format the output as a valid JSON object with "atsScore" (number) and "suggestions" (array of strings). Resume Data: {resumeData}';

function ViewResume() {

    const [resumeInfo,setResumeInfo]=useState();
    const {resumeId}=useParams();
    const [aiResult, setAiResult] = useState({
        atsScore: 0,
        suggestions: []
    });
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        GetResumeInfo();
    },[])
    
    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
            const data = resp.data.data;
            setResumeInfo(data);
            GenerateATSScore(data);
        })
    }

    const GenerateATSScore = async (data) => {
        setLoading(true);
        const resumeString = JSON.stringify(data);
        const finalPrompt = PROMPT.replace('{resumeData}', resumeString);
        
        try {
            const result = await AIChatSession.sendMessage(finalPrompt);
            const text = result.response.text();
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                setAiResult(parsed);
            }
        } catch (error) {
            console.error("Error generating ATS score:", error);
            if(error.message.includes('429')) {
                toast("AI Insights are temporarily unavailable (Quota limit).");
            } else {
                toast("Failed to generate AI insights.");
            }
        } finally {
            setLoading(false);
        }
    }

    const HandleDownload=()=>{
        window.print();
    }

    const CopyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        toast("Link copied to clipboard!");
    }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}} >
        <div id="no-print" className='bg-slate-50/50 min-h-screen pb-20'>
            <Header/>

            <div className='max-w-5xl mx-auto px-6 pt-12 text-center'>
                <div className='inline-flex items-center justify-center p-2 px-4 rounded-full bg-green-50 text-green-600 mb-6 border border-green-100 animate-in fade-in zoom-in duration-500'>
                    <Trophy className='h-4 w-4 mr-2' />
                    <span className='text-sm font-bold uppercase tracking-wider'>Resume Ready & Optimized</span>
                </div>
                
                <h2 className='text-4xl font-extrabold text-slate-900 tracking-tight'>
                    Your ATS-Friendly Resume is Ready!
                </h2>
                <p className='mt-4 text-lg text-slate-500 max-w-2xl mx-auto'>
                    Download your optimized PDF or share your professional link with recruiters. 
                    Built to pass through hiring systems effortlessly.
                </p>

                {/* Score & Insights Section */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 my-12'>
                    <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group'>
                         {loading && (
                             <div className='absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center'>
                                 <Loader2 className='h-6 w-6 text-primary animate-spin mb-2' />
                                 <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>Analyzing...</span>
                             </div>
                         )}
                         <div className='flex items-center gap-3 mb-3'>
                             <div className='p-2 rounded-lg bg-primary/10 text-primary'>
                                <BarChart3 className='h-5 w-5' />
                             </div>
                             <span className='font-bold text-slate-900'>ATS Score</span>
                         </div>
                         <div className='text-3xl font-bold text-primary'>
                            {aiResult.atsScore}/100
                         </div>
                         <p className='text-xs text-slate-400 mt-2 font-medium'>
                            {aiResult.atsScore > 80 ? 'Highly competitive profile' : aiResult.atsScore > 50 ? 'Needs some improvements' : 'Incomplete or weak profile'}
                         </p>
                    </div>

                    <div className='md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-left relative overflow-hidden'>
                        {loading && (
                             <div className='absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center'>
                                 <Loader2 className='h-6 w-6 text-primary animate-spin mb-2' />
                                 <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>Generating Suggestions...</span>
                             </div>
                         )}
                        <div className='flex items-center gap-3 mb-4'>
                             <div className='p-2 rounded-lg bg-amber-50 text-amber-500'>
                                <Sparkles className='h-5 w-5' />
                             </div>
                             <span className='font-bold text-slate-900'>AI Improvement Suggestions</span>
                         </div>
                         <div className='grid grid-cols-1 gap-2'>
                            {aiResult.suggestions.map((suggestion, index) => (
                                <div key={index} className='flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100'>
                                    <CheckCircle2 className='h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0' />
                                    {suggestion}
                                </div>
                            ))}
                            {aiResult.suggestions.length === 0 && !loading && (
                                <p className='text-xs text-slate-400 italic'>No suggestions available. Complete your resume for analysis.</p>
                            )}
                         </div>
                    </div>
                </div>

                <div className='flex flex-wrap items-center justify-center gap-4 py-8 border-y border-slate-200/60'>
                    <Button onClick={HandleDownload} className="bg-primary hover:bg-primary/90 h-12 px-8 font-bold gap-2 shadow-lg">
                        <Download className='h-4 w-4' /> Download PDF
                    </Button>
                    
                    <RWebShare
                        data={{
                            text: "Hello Everyone, This is my professional resume.",
                            url: window.location.href,
                            title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" Resume",
                        }}
                    > 
                        <Button variant="outline" className="h-12 px-8 font-bold gap-2 border-slate-200 bg-white">
                            <Share2 className='h-4 w-4' /> Share Link
                        </Button>
                    </RWebShare>
                </div>
            </div>

            <div className='max-w-[900px] mx-auto my-16 px-4 md:px-0'>
                <div id="print-area" className='shadow-2xl rounded-sm'>
                    <ResumePreview/>
                </div>
            </div>
        </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume