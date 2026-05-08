import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Settings2, CheckCircle2 } from 'lucide-react'
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import Projects from './forms/Projects';
import { Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';

function FormSection() {
  const [activeFormIndex,setActiveFormIndex]=useState(1);
  const [enableNext,setEnableNext]=useState(true);
  const {resumeId}=useParams();

  const steps = [
    { id: 1, label: 'Personal' },
    { id: 2, label: 'Summary' },
    { id: 3, label: 'Experience' },
    { id: 4, label: 'Projects' },
    { id: 5, label: 'Education' },
    { id: 6, label: 'Skills' },
    { id: 7, label: 'Finalize' }
  ];

  return (
    <div className='flex flex-col gap-6'>
        {/* Editor Toolbar */}
        <div className='flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm'>
          <div className='flex items-center gap-3'>
            <ThemeColor/>
            <Button variant="outline" size="sm" className="gap-2 text-slate-600">
               <Settings2 className='h-4 w-4' /> Settings
            </Button>
          </div>
          
          <div className='flex items-center gap-2'>
            {activeFormIndex > 1 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2"
                onClick={() => setActiveFormIndex(activeFormIndex - 1)}> 
                <ArrowLeft className='h-4 w-4' /> Back 
              </Button>
            )}
            
            <Button 
              disabled={!enableNext}
              size="sm"
              className="gap-2 bg-primary hover:bg-primary/90 shadow-sm"
              onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            > 
              {activeFormIndex === 6 ? 'Finish' : 'Next'} 
              <ArrowRight className='h-4 w-4' /> 
            </Button>
          </div>
        </div>

        {/* Stepper Progress */}
        <div className='bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm'>
           <div className='flex items-center justify-between relative'>
              {steps.map((step, idx) => (
                <div key={step.id} className='flex flex-col items-center z-10'>
                   <div 
                      onClick={() => idx + 1 < activeFormIndex && setActiveFormIndex(idx + 1)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all cursor-pointer ${
                      activeFormIndex === step.id 
                        ? 'bg-primary text-white ring-4 ring-primary/20' 
                        : activeFormIndex > step.id 
                          ? 'bg-green-500 text-white' 
                          : 'bg-slate-100 text-slate-400'
                   }`}>
                      {activeFormIndex > step.id ? <CheckCircle2 className='h-4 w-4' /> : step.id}
                   </div>
                   <span className={`mt-2 text-[10px] font-bold uppercase tracking-wider ${
                      activeFormIndex === step.id ? 'text-primary' : 'text-slate-400'
                   }`}>{step.label}</span>
                </div>
              ))}
              {/* Progress Line */}
              <div className='absolute top-4 left-0 h-[2px] w-full bg-slate-100 -z-0' />
              <div 
                 className='absolute top-4 left-0 h-[2px] bg-primary transition-all duration-300 -z-0' 
                 style={{ width: `${((activeFormIndex - 1) / (steps.length - 1)) * 100}%` }}
              />
           </div>
        </div>

        {/* Form Content */}
        <div className='min-h-[500px]'>
          {activeFormIndex === 1 ?  
            <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
            : activeFormIndex === 2 ?
              <Summary enabledNext={(v) => setEnableNext(v)} />
            : activeFormIndex === 3 ?
              <Experience />  
            : activeFormIndex === 4 ?
               <Projects />
            : activeFormIndex === 5 ?
              <Education />
            : activeFormIndex === 6 ?
              <Skills />
            : activeFormIndex === 7 ?
              <Navigate to={'/my-resume/' + resumeId + "/view"} />
            : null
          }
        </div>
    </div>
  )
}

export default FormSection