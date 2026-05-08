import React from 'react'
import { Github, Globe } from 'lucide-react'

function ProjectsPreview({ resumeInfo }) {
    return (
        <div className='my-6'>
            <h2 className='font-bold text-sm mb-2 uppercase tracking-wide'
                style={{ color: resumeInfo?.themeColor }}>
                Projects
            </h2>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />

            {resumeInfo?.projects?.map((project, index) => (
                <div key={index} className='my-4'>
                    <div className='flex justify-between items-baseline'>
                        <h3 className='text-sm font-bold'
                            style={{ color: resumeInfo?.themeColor }}>
                            {project.projectName}
                        </h3>
                        <div className='flex gap-3'>
                            {project?.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noreferrer" className='text-[10px] flex items-center gap-1 text-slate-500 hover:text-primary transition-colors'>
                                    <Github className='h-2.5 w-2.5' /> Code
                                </a>
                            )}
                            {project?.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noreferrer" className='text-[10px] flex items-center gap-1 text-slate-500 hover:text-primary transition-colors'>
                                    <Globe className='h-2.5 w-2.5' /> Demo
                                </a>
                            )}
                        </div>
                    </div>
                    <div className='text-[10px] font-semibold text-slate-700 italic mb-1'>
                        {project?.techStack}
                    </div>
                    <div className='text-[10px] text-slate-600 leading-relaxed ats-bullets' 
                        dangerouslySetInnerHTML={{ __html: project?.description }} 
                    />
                </div>
            ))}
        </div>
    )
}

export default ProjectsPreview;
