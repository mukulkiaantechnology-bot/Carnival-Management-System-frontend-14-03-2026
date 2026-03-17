import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Upload, CheckCircle2, X, Info,
  FileText, Video, BookOpen, Clock, AlertCircle
} from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useTraining } from '../../context/TrainingContext';

export default function AddTraining() {
  const navigate = useNavigate();
  const { addTraining } = useTraining();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const newTraining = {
      title: formData.get('title'),
      description: formData.get('description'),
      type: 'Video',
      duration: '0 mins', // Placeholder
    };

    // Simulate upload delay
    setTimeout(() => {
      addTraining(newTraining);
      setIsSubmitting(false);
      setNotification('Training Module Saved! Redirecting to library...');
      setTimeout(() => {
        navigate('/hr/training-library');
      }, 1500);
    }, 1000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVideo(file.name);
    }
  };

  return (
    <div className="space-y-6 px-1 relative pb-10">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-8 z-[110] animate-in slide-in-from-right duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-[1.5rem] shadow-2xl flex items-center gap-4 border border-slate-800">
            <div className="bg-emerald-500/20 p-2 rounded-xl">
              <CheckCircle2 size={18} className="text-emerald-400" />
            </div>
            <span className="text-sm font-black tracking-tight">{notification}</span>
          </div>
        </div>
      )}

      <button
        onClick={() => navigate('/hr/training-library')}
        className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-sm transition-all group"
      >
        <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-blue-50 transition-colors">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        </div>
        Back to Library
      </button>

      <Card className="max-w-2xl mx-auto border-none shadow-2xl shadow-slate-200/50 overflow-hidden rounded-[2.5rem]">
        <div className="p-8 pb-0 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-600 mb-4 shadow-inner">
            <Video size={40} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Upload training Module</h2>
          <p className="text-slate-500 text-sm font-bold mt-1 max-w-[80%]">Publish high-quality educational content for your carnival staff members.</p>
        </div>

        <form className="p-10 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Training Identity Title</label>
            <input
              required
              name="title"
              type="text"
              placeholder="e.g. Advanced Crowd Management 2.0"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Detailed Description</label>
            <textarea
              required
              name="description"
              rows={4}
              placeholder="What specifically will the staff learn from this training module?"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none font-bold text-slate-700 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Source Video file</label>
            <div
              onClick={() => document.getElementById('video-upload').click()}
              className="relative group cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center p-12 border-2 border-slate-100 border-dashed rounded-[2rem] bg-slate-50 hover:bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all">
                <div className={`p-5 rounded-3xl transition-all shadow-sm mb-4 ${selectedVideo ? 'bg-emerald-50 text-emerald-600' : 'bg-white text-slate-300 group-hover:text-blue-500'}`}>
                  {selectedVideo ? <CheckCircle2 size={32} /> : <Upload size={32} />}
                </div>
                <div className="space-y-1 text-center">
                  <p className="text-sm font-black text-slate-800 tracking-tight">
                    {selectedVideo ? selectedVideo : 'Click to select or drag and drop'}
                  </p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter italic">High Definition MP4 or WebM (Max 100MB)</p>
                </div>
              </div>
              <input
                id="video-upload"
                type="file"
                className="hidden"
                accept="video/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button 
              variant="ghost" 
              className="flex-1 font-black h-10 sm:h-12 text-xs sm:text-sm rounded-2xl shadow-sm border border-brand-red/10 bg-brand-red/5 text-brand-red hover:bg-brand-red hover:text-white transition-all" 
              type="button" 
              onClick={() => navigate('/hr/training-library')}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-[2] font-black h-10 sm:h-12 text-xs sm:text-sm rounded-2xl shadow-2xl shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed group"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing Content...' : (
                <span className="flex items-center justify-center gap-2">
                  Save & Publish <Clock size={14} className="group-hover:rotate-12 transition-transform" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
