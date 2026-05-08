import React from 'react'

function ExperiencePreview({resumeInfo}) {
  return (
    <div className='my-6'>
        <h2 className='font-bold text-sm mb-2 uppercase tracking-wide'
        style={{
            color:resumeInfo?.themeColor
        }}
        >Professional Experience</h2>
        <hr style={{
            borderColor:resumeInfo?.themeColor
        }} />

        {resumeInfo?.experience?.map((experience,index)=>(
            <div key={index} className='my-5'>
                <div className='flex justify-between items-baseline'>
                    <h3 className='text-sm font-bold'
                    style={{
                        color:resumeInfo?.themeColor
                    }}>{experience?.title}</h3>
                    <span className='text-[10px] font-medium text-slate-500'>
                        {experience?.startDate} — {experience?.currentlyWorking ? 'Present' : experience.endDate}
                    </span>
                </div>
                <div className='flex justify-between items-center mb-1'>
                    <span className='text-[11px] font-semibold text-slate-700 italic'>{experience?.companyName}</span>
                    <span className='text-[10px] text-slate-500'>{experience?.city}{experience?.state ? `, ${experience.state}` : ''}</span>
                </div>
                <div className='text-[11px] text-slate-700 leading-relaxed ats-bullets' 
                     dangerouslySetInnerHTML={{__html:experience?.workSummary}} 
                />
            </div>
        ))}
    </div>
  )
}

export default ExperiencePreview