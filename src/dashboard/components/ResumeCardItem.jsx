import { Loader2Icon, MoreVertical, FileText, ExternalLink, Download, Trash2, Edit3, Eye, Sparkles, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { AIChatSession } from './../../../service/AIModal'

const PROMPT = 'Analyze this resume content and provide an ATS score (0-100). Consider the completeness of sections. If sections are missing or content is thin, reduce the score. Format the output as a valid JSON object with "atsScore" (number). Resume Data: {resumeData}';

function ResumeCardItem({resume,refreshData}) {

  const navigation=useNavigate();
  const [openAlert,setOpenAlert]=useState(false);
  const [loading,setLoading]=useState(false);
  const [atsScore, setAtsScore] = useState(resume?.atsScore || 0);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    // If score is 0 or default, try to generate it once
    if (!resume?.atsScore) {
      GenerateATSScore();
    } else {
      setAtsScore(resume.atsScore);
    }
  }, [resume]);

  const GenerateATSScore = async () => {
    setAiLoading(true);
    const resumeString = JSON.stringify(resume);
    const finalPrompt = PROMPT.replace('{resumeData}', resumeString);
    
    try {
      const result = await AIChatSession.sendMessage(finalPrompt);
      const text = result.response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setAtsScore(parsed.atsScore);
        // Optionally update the backend with the new score
        GlobalApi.UpdateResumeDetail(resume.documentId, {
          data: { atsScore: parsed.atsScore }
        });
      }
    } catch (error) {
      console.error("Error generating ATS score:", error);
    } finally {
      setAiLoading(false);
    }
  }

  const onDelete=()=>{
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp=>{
      toast('Resume Deleted!');
      refreshData()
      setLoading(false);
      setOpenAlert(false);
    },(error)=>{
      setLoading(false);
      toast('Error deleting resume.');
    })
  }

  return (
    <div className='group relative flex flex-col h-[300px]'>
      <Link to={'/dashboard/resume/'+resume.documentId+"/edit"}>
        <div className='relative h-[240px] rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/30 flex items-center justify-center overflow-hidden'>
           <div className='absolute top-0 left-0 h-1.5 w-full' style={{backgroundColor: resume?.themeColor || '#7C3AED'}} />
           
           <div className='flex flex-col items-center gap-4 transition-transform group-hover:scale-105'>
              <div className='p-4 rounded-full bg-slate-50 text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors'>
                 <FileText className='h-12 w-12' />
              </div>
              <div className='flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest relative overflow-hidden'>
                 {aiLoading && <div className='absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center'><Loader2 className='h-3 w-3 animate-spin text-primary' /></div>}
                 ATS Score: <span className='text-primary'>{atsScore}</span>
              </div>
           </div>

           {/* Hover Overlay */}
           <div className='absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
              <Button size="sm" className="bg-white text-slate-900 hover:bg-slate-50 shadow-lg border-none gap-2 font-bold uppercase tracking-wider text-[10px]">
                 <Edit3 className='h-3 w-3' /> Edit Resume
              </Button>
           </div>
        </div>
      </Link>

      <div className='flex items-center justify-between mt-3 px-1'>
        <div className='flex flex-col'>
          <h2 className='text-sm font-bold text-slate-900 truncate max-w-[140px]'>{resume.title}</h2>
          <p className='text-[10px] text-slate-400 font-medium'>
            {resume?.updatedAt ? `Updated ${new Date(resume.updatedAt).toLocaleDateString()}` : 'Recently updated'}
          </p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900">
              <MoreVertical className='h-4 w-4'/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 p-1">
            <DropdownMenuItem onClick={()=>navigation('/dashboard/resume/'+resume.documentId+"/edit")} className="gap-2 text-slate-600 text-xs">
              <Edit3 className='h-3 w-3' /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.documentId+"/view")} className="gap-2 text-slate-600 text-xs">
              <Eye className='h-3 w-3' /> View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.documentId+"/view")} className="gap-2 text-slate-600 text-xs">
              <Download className='h-3 w-3' /> Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setOpenAlert(true)} className="gap-2 text-destructive focus:text-destructive text-xs">
              <Trash2 className='h-3 w-3' /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={openAlert}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{resume.title}". You cannot undo this action.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className='flex justify-end gap-3 mt-4'>
             <AlertDialogCancel onClick={()=>setOpenAlert(false)} className="border-slate-200">Cancel</AlertDialogCancel>
             <AlertDialogAction onClick={onDelete} disabled={loading} className="bg-destructive hover:bg-destructive/90 text-white border-none">
                {loading? <Loader2Icon className='animate-spin h-4 w-4'/> : 'Delete Resume'}
             </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ResumeCardItem