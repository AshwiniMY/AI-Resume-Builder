import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle, Sparkles } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';

const PROMPT = 'position title: {positionTitle}. Based on this position title, provide 5-7 bullet points for a resume experience section. Format the output as a valid JSON object with a single key "bulletPoints" containing the bullet points formatted as a single HTML string containing <ul> and <li> tags.';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {

    if (!resumeInfo?.experience[index]?.title) {
      toast('Please enter a position title first.');
      return;
    }
    setLoading(true)
    const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      let resp = result.response.text();

      const jsonMatch = resp.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
      if (jsonMatch) resp = jsonMatch[0];
      resp = resp.replace(/,\s*([\]}])/g, '$1');

      let parsedValue = resp;
      try {
        const jsonResp = JSON.parse(resp);
        parsedValue = jsonResp.bulletPoints || jsonResp.bullet_points || resp.replace('[', '').replace(']', '');
      } catch (e) {
        parsedValue = resp.replace('[', '').replace(']', '');
      }
      setValue(parsedValue);
      onRichTextEditorChange({ target: { value: parsedValue } });
    } catch (error) {
      toast(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className='flex justify-between items-end mb-3'>
        <label className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>Work Description</label>
        <Button variant="outline" size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary font-bold text-[10px] uppercase tracking-wider h-8 hover:bg-primary/5">
          {loading ?
            <LoaderCircle className='animate-spin h-3 w-3' /> :
            <>
              <Sparkles className='h-3 w-3' /> AI Writer
            </>
          }
        </Button>
      </div>
      <div className='rounded-xl border border-slate-200 overflow-hidden bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all'>
        <EditorProvider>
          <Editor value={value} onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e)
          }}>
            <Toolbar className="bg-slate-50/50 border-b border-slate-100 p-1">
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <BtnStrikeThrough />
              <Separator />
              <BtnNumberedList />
              <BtnBulletList />
              <Separator />
              <BtnLink />
            </Toolbar>
          </Editor>
        </EditorProvider>
      </div>
    </div>
  )
}

export default RichTextEditor