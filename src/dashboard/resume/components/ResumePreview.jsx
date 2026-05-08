import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'
import ProjectsPreview from './preview/ProjectsPreview'

function ResumePreview() {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)

    return (
        <div className='bg-white shadow-xl min-h-[1100px] p-12 border-t-[12px] border-primary transition-all overflow-hidden'
             id="print-area">
            {/* Personal Detail */}
            <PersonalDetailPreview resumeInfo={resumeInfo} />
            
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-4'>
                {/* Main Content Area (2/3 width) */}
                <div className='md:col-span-2 space-y-2'>
                    {/* Professional Summary */}
                    {resumeInfo?.summary && <SummaryPreview resumeInfo={resumeInfo} />}
                    
                    {/* Professional Experience */}
                    {resumeInfo?.experience?.length > 0 && <ExperiencePreview resumeInfo={resumeInfo} />}

                    {/* Projects Section */}
                    {resumeInfo?.projects?.length > 0 && <ProjectsPreview resumeInfo={resumeInfo} />}
                </div>

                {/* Sidebar Area (1/3 width) */}
                <div className='space-y-2 border-l border-slate-50 pl-8'>
                    {/* Skills */}
                    {resumeInfo?.skills?.length > 0 && <SkillsPreview resumeInfo={resumeInfo}/>}

                    {/* Educational */}
                    {resumeInfo?.education?.length > 0 && <EducationalPreview resumeInfo={resumeInfo} />}
                </div>
            </div>
        </div>
    )
}

export default ResumePreview