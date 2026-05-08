import React from 'react'

function EducationalPreview({resumeInfo}) {
  return (
    <div className='my-6'>
    <h2 className='font-bold text-sm mb-2 uppercase tracking-wide'
    style={{
        color:resumeInfo?.themeColor
    }}
    >Education</h2>
    <hr style={{
        borderColor:resumeInfo?.themeColor
    }} />

    {resumeInfo?.education?.map((education,index)=>(
        <div key={index} className='my-4'>
            <div className='flex justify-between items-baseline'>
                <h3 className='text-sm font-bold'
                    style={{
                        color:resumeInfo?.themeColor
                    }}
                >{education.universityName}</h3>
                <span className='text-[10px] font-medium text-slate-500'>{education?.startDate} — {education?.endDate}</span>
            </div>
            <h4 className='text-[11px] font-semibold text-slate-700 italic'>
                {education?.degree} {education?.major ? `in ${education.major}` : ''}
                {education?.universityName ? '' : ''}
            </h4>
            <p className='text-[10px] mt-2 text-slate-600 leading-relaxed'>
                {education?.description}
            </p>
        </div>
    ))}

    </div>
  )
}

export default EducationalPreview