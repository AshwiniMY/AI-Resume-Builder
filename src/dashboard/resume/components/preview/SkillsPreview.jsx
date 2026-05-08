import React from 'react'

function SkillsPreview({resumeInfo}) {
  return (
    <div className='my-6'>
    <h2 className='font-bold text-sm mb-2 uppercase tracking-wide'
    style={{
        color:resumeInfo?.themeColor
    }}
    >Skills</h2>
    <hr style={{
        borderColor:resumeInfo?.themeColor
    }} />

    <div className='flex flex-wrap gap-2 my-4'>
        {resumeInfo?.skills?.map((skill,index)=>(
            <div key={index} className='flex items-center'>
                <span className='text-xs bg-slate-100 px-3 py-1 rounded-full border border-slate-200 font-medium text-slate-700'>
                    {skill.name}
                </span>
            </div>
        ))}
    </div>
    </div>
  )
}

export default SkillsPreview