import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function AddTraining() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 px-1">
      <button 
        onClick={() => navigate('/hr/training-library')} 
        className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Library
      </button>

      <Card className="max-w-2xl mx-auto border-none shadow-md">
        <CardHeader title="Upload Training Module" subtitle="Create new educational content for the staff." />
        <form className="p-6 space-y-5" onSubmit={(e) => { e.preventDefault(); alert('Training saved successfully!'); navigate('/hr/training-library'); }}>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Training Title</label>
            <input
              required
              type="text"
              placeholder="e.g. Advanced Crowd Management"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
            <textarea
              required
              rows={4}
              placeholder="Provide a brief overview of what this training covers..."
              className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Upload Video</label>
            <div 
              onClick={() => document.getElementById('video-upload').click()}
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-100 border-dashed rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group"
            >
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-10 w-10 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <div className="flex text-sm text-slate-600">
                  <label className="relative cursor-pointer rounded-md font-bold text-blue-600 hover:text-blue-500">
                    <span>Upload a file</span>
                    <input 
                      id="video-upload"
                      type="file" 
                      className="sr-only" 
                      accept="video/*" 
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          alert(`Selected: ${e.target.files[0].name}`);
                        }
                      }}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-slate-500">MP4, WebM up to 100MB</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <Button variant="secondary" className="flex-1 font-bold" type="button" onClick={() => navigate('/hr/training-library')}>Cancel</Button>
            <Button variant="primary" className="flex-1 font-bold shadow-lg shadow-blue-500/20" type="submit">Save Training</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
