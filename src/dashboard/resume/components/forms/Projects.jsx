import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { LoaderCircle, FolderGit2, Plus, Trash2, Globe, Github, Sparkles, CheckCircle2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { AIChatSession } from './../../../../../service/AIModal'

const PROMPT = 'Project Name: {projectName}, Tech Stack: {techStack}. Based on this, provide 3-4 professional bullet points for a resume project description. Format the output as a valid JSON object with a single key "description" containing the bullet points as a single HTML string with <ul> and <li> tags.';

function Projects() {
    const [projectList, setProjectList] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(-1);

    useEffect(() => {
        if (resumeInfo?.projects?.length > 0) {
            setProjectList(resumeInfo.projects);
        } else if (projectList.length === 0) {
            setProjectList([{
                projectName: '',
                techStack: '',
                githubUrl: '',
                liveUrl: '',
                description: ''
            }]);
        }
    }, [resumeInfo]);

    const handleChange = (index, event) => {
        const newEntries = projectList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setProjectList(newEntries);
    }

    const AddNewProject = () => {
        setProjectList([...projectList, {
            projectName: '',
            techStack: '',
            githubUrl: '',
            liveUrl: '',
            description: ''
        }]);
    }

    const RemoveProject = (index) => {
        const newList = projectList.filter((_, i) => i !== index);
        setProjectList(newList);
    }

    const GenerateAIContent = async (index) => {
        if (!projectList[index].projectName) {
            toast('Please enter a Project Name first');
            return;
        }
        setAiLoading(index);
        const prompt = PROMPT.replace('{projectName}', projectList[index].projectName)
                            .replace('{techStack}', projectList[index].techStack || 'Relevant technologies');
        
        try {
            const result = await AIChatSession.sendMessage(prompt);
            let resp = result.response.text();
            const jsonMatch = resp.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                const newEntries = projectList.slice();
                newEntries[index].description = parsed.description;
                setProjectList(newEntries);
            }
        } catch (error) {
            toast('Failed to generate description');
        } finally {
            setAiLoading(-1);
        }
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            projects: projectList
        });
    }, [projectList]);

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                projects: projectList
            }
        };
        GlobalApi.UpdateResumeDetail(resumeInfo?.documentId, data).then(resp => {
            setLoading(false);
            toast('Projects updated successfully');
        }, (error) => {
            setLoading(false);
            toast('Failed to update projects');
        });
    }

    return (
        <div className='flex flex-col gap-6'>
            <div className='ats-card p-8'>
                <div className='mb-8'>
                    <h2 className='text-2xl font-bold text-slate-900'>Personal Projects</h2>
                    <p className='text-slate-500 mt-1'>Showcase your work and technical skills through your best projects.</p>
                </div>

                <div className='space-y-8'>
                    {projectList.map((item, index) => (
                        <div key={index} className='relative p-6 border border-slate-100 rounded-2xl bg-slate-50/30'>
                            {projectList.length > 1 && (
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => RemoveProject(index)}
                                    className="absolute top-4 right-4 h-8 w-8 text-slate-400 hover:text-destructive hover:bg-destructive/5">
                                    <Trash2 className='h-4 w-4' />
                                </Button>
                            )}

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                                        <FolderGit2 className='h-3 w-3' /> Project Name
                                    </label>
                                    <Input name="projectName" 
                                        value={item.projectName}
                                        onChange={(e) => handleChange(index, e)}
                                        className="h-11 border-slate-200 bg-white"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>Tech Stack</label>
                                    <Input name="techStack" 
                                        value={item.techStack}
                                        placeholder="React, Node.js, Tailwind"
                                        onChange={(e) => handleChange(index, e)}
                                        className="h-11 border-slate-200 bg-white"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                                        <Github className='h-3 w-3' /> GitHub URL
                                    </label>
                                    <Input name="githubUrl" 
                                        value={item.githubUrl}
                                        onChange={(e) => handleChange(index, e)}
                                        className="h-11 border-slate-200 bg-white"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                                        <Globe className='h-3 w-3' /> Live Demo URL
                                    </label>
                                    <Input name="liveUrl" 
                                        value={item.liveUrl}
                                        onChange={(e) => handleChange(index, e)}
                                        className="h-11 border-slate-200 bg-white"
                                    />
                                </div>
                                <div className='md:col-span-2 space-y-2'>
                                    <div className='flex justify-between items-center'>
                                        <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>Project Description</label>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            disabled={aiLoading === index}
                                            onClick={() => GenerateAIContent(index)}
                                            className="text-[10px] font-bold uppercase tracking-wider text-primary hover:bg-primary/5 gap-1.5 h-7">
                                            {aiLoading === index ? <LoaderCircle className='h-3 w-3 animate-spin' /> : <Sparkles className='h-3 w-3' />} AI Generate
                                        </Button>
                                    </div>
                                    <Textarea 
                                        name="description"
                                        value={item.description}
                                        onChange={(e) => handleChange(index, e)}
                                        className="min-h-[120px] border-slate-200 bg-white"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='mt-8 flex flex-col sm:flex-row justify-between gap-4'>
                    <Button variant="outline" onClick={AddNewProject} className="gap-2 border-primary text-primary font-bold hover:bg-primary/5">
                        <Plus className='h-4 w-4' /> Add Project
                    </Button>
                    
                    <Button disabled={loading} onClick={onSave} className="bg-primary hover:bg-primary/90 px-10 shadow-md">
                        {loading ? <LoaderCircle className='animate-spin h-4 w-4' /> : 'Save Projects'}    
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Projects;
