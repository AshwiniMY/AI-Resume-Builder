import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Palette } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function ThemeColor() {
    const colors=[
        "#7C3AED", "#10B981", "#3B82F6", "#EF4444", "#F59E0B",
        "#6366F1", "#EC4899", "#14B8A6", "#8B5CF6", "#F43F5E",
        "#06B6D4", "#84CC16", "#F97316", "#0EA5E9", "#64748B",
        "#D946EF", "#0891B2", "#4F46E5", "#DC2626", "#059669"
    ]

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [selectedColor,setSelectedColor]=useState();
    const {resumeId}=useParams();
    
    const onColorSelect=(color)=>{
        setSelectedColor(color)
        setResumeInfo({
            ...resumeInfo,
            themeColor:color
        });
        const data={
            data:{
                themeColor:color
            }
        }
        GlobalApi.UpdateResumeDetail(resumeId,data).then(resp=>{
            toast('Theme color updated successfully.')
        })
    }

  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 text-slate-600 border-slate-200 bg-white"> 
                <Palette className='h-4 w-4'/> Theme
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-4">
            <h2 className='mb-3 text-xs font-bold uppercase tracking-widest text-slate-400'>Brand Color</h2>
            <div className='grid grid-cols-5 gap-3'>
                {colors.map((item,index)=>(
                    <div 
                        key={index}
                        onClick={()=>onColorSelect(item)}
                        className={`h-6 w-6 rounded-full cursor-pointer transition-all hover:scale-125 border-2 ${selectedColor==item?'border-slate-900 shadow-sm':'border-transparent'}`}
                        style={{
                            background:item
                        }}>
                    </div>
                ))}
            </div>
        </PopoverContent>
    </Popover>
  )
}

export default ThemeColor