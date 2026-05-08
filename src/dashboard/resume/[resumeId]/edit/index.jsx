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
          setResumeInfo(resp.data.data);
        })
    }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
      <div className='min-h-screen bg-slate-50/30'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10 max-w-[1600px] mx-auto'>
            {/* Form Section (Left - 5 columns) */}
            <div className='lg:col-span-5'>
               <FormSection/>
            </div>

            {/* Preview Section (Right - 7 columns) */}
            <div className='lg:col-span-7'>
               <div className='sticky top-24'>
                  <ResumePreview/>
               </div>
            </div>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume