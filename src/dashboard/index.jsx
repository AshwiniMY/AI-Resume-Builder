import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';
import { FileText } from 'lucide-react';

function Dashboard() {

  const {user}=useUser();
  const [resumeList,setResumeList]=useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(()=>{
    user&&GetResumesList()
  },[user])

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList=()=>{
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
    .then(resp=>{
      setResumeList(resp.data.data);
    })
  }

  const filteredResumes = resumeList.filter(resume => 
    resume.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='min-h-screen bg-slate-50/50 p-6 md:px-12 lg:px-24'>
      <div className='max-w-7xl mx-auto'>
        
        {/* Dashboard Header */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-slate-900'>My Resumes</h1>
            <p className='text-slate-500 mt-1'>Create and manage your professional ATS-friendly resumes.</p>
          </div>
        </div>

        {/* Resume Stats/Quick Info (Optional but adds value) */}
        <div className='flex gap-4 mb-8 text-sm text-slate-500'>
           <div className='flex items-center gap-1.5'>
              <FileText className='h-4 w-4' />
              <span className='font-semibold text-slate-900'>{resumeList.length}</span> Total Resumes
           </div>
        </div>

        {/* Resume Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          <AddResume/>
          
          {resumeList.length > 0 ? (
            filteredResumes.map((resume, index) => (
              <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
            ))
          ) : searchQuery === '' ? (
            // Skeleton Loader
            [1, 2, 3, 4].map((item, index) => (
              <div key={index} className='h-[280px] rounded-xl bg-slate-200/60 animate-pulse border border-slate-100 shadow-sm'>
              </div>
            ))
          ) : (
             <div className='col-span-full py-20 text-center'>
                <p className='text-slate-500'>No resumes found matching "{searchQuery}"</p>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard