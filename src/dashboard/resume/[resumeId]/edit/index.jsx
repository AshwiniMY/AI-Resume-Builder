import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';

function EditResume() {
    const {resumeId}=useParams();
    const [resumeInfo,setResumeInfo]=useState();
    
    useEffect(()=>{
        GetResumeInfo();
    },[])

    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
          const data = resp.data.data;
          // Store documentId specifically for API updates
          setResumeInfo({
            ...data,
            documentId: data.documentId
          });
        })
    }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
      <div className='h-screen bg-slate-50/30 overflow-hidden flex flex-col'>
        <div className='flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 max-w-[1600px] mx-auto w-full'>
            {/* Form Section (Left - 5 columns) */}
            <div className='lg:col-span-5 h-full overflow-y-auto p-6 md:p-10 border-r border-slate-200'>
               <FormSection/>
            </div>
 
            {/* Preview Section (Right - 7 columns) */}
            <div className='lg:col-span-7 h-full overflow-y-auto p-6 md:p-10 bg-white/50 backdrop-blur-sm'>
               <div className='max-w-[800px] mx-auto'>
                  <ResumePreview/>
               </div>
            </div>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume