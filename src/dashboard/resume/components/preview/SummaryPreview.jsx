import React from 'react'

function SummaryPreview({resumeInfo}) {
  return (
    <div className='my-6'>
        <h2 className='font-bold text-sm mb-2 uppercase tracking-wide'
        style={{
            color:resumeInfo?.themeColor
        }}
        >Professional Summary</h2>
        <hr style={{
            borderColor:resumeInfo?.themeColor
        }} />
        <p className='text-[11px] leading-relaxed text-slate-700 mt-3'>
            {resumeInfo?.summary}
        </p>
    </div>
  )
}

export default SummaryPreview