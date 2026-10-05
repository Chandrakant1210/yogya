import React, { useState, useEffect } from 'react';
import { Camera, Video, AlertCircle, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, RotateCcw } from 'lucide-react';

export default function WorkerLiveCapture({ taskId = 1, onCaptureComplete, onBack }) {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [recorded, setRecorded] = useState(false);

  // Timer simulation during recording
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setSeconds(0);
    setRecorded(false);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecorded(true);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="flex-1 flex flex-col justify-between text-[#29243A]">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between text-xs text-[#817A91] mb-6 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1 hover:text-[#29243A] cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-[#29243A]">Task {taskId} of 4 • Live Evidence Capture</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-butter text-[#29243A] font-bold border border-butter-dark/50">
              Offline Ready
            </span>
          </div>
        </div>

        {/* Viewfinder & Controls Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Camera Viewfinder (2 Columns) */}
          <div className="md:col-span-2 bg-slate-950 rounded-3xl p-4 flex flex-col items-center justify-between min-h-[360px] relative overflow-hidden shadow-md">
            
            {/* Top Viewfinder Overlay */}
            <div className="w-full flex items-center justify-between z-10">
              {/* Anti-Replay Challenge */}
              <div className="bg-black/70 backdrop-blur border border-white/20 px-3 py-1.5 rounded-full text-xs font-bold text-butter shadow-sm">
                Say the word: <span className="underline decoration-butter">LAMP</span>
              </div>

              {/* Live recording indicator */}
              {isRecording ? (
                <div className="flex items-center gap-2 bg-rose-500/90 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <span>REC {formatTime(seconds)}</span>
                </div>
              ) : (
                <div className="text-xs text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
                  Ready to capture
                </div>
              )}
            </div>

            {/* Viewfinder Center Frame */}
            <div className="my-auto flex flex-col items-center justify-center text-center">
              <div className="w-48 h-32 border-2 border-dashed border-white/30 rounded-2xl flex flex-col items-center justify-center">
                <Camera className="w-8 h-8 text-white/40 mb-1" />
                <span className="text-[11px] text-white/50">Keep tools & hands inside frame</span>
              </div>
            </div>

            {/* Live Quality Guidance Overlay */}
            <div className="w-full flex items-center justify-between z-10 bg-black/60 backdrop-blur border border-white/10 px-4 py-2 rounded-2xl text-[11px]">
              <span className="text-emerald-400 font-semibold">● Light good</span>
              <span className="text-emerald-400 font-semibold">● Steady</span>
              <span className="text-butter font-semibold">● Move closer</span>
            </div>
          </div>

          {/* Right Column: Instructions & Quality Checklist */}
          <div className="flex flex-col justify-between space-y-4">
            
            {/* Safety Guidance Banner (Butter Yellow) */}
            <div className="bg-butter/50 border border-butter-dark/50 rounded-2xl p-4 shadow-2xs">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#29243A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#29243A]">Mandatory Safety Check</h4>
                  <p className="text-[11px] text-[#29243A] mt-1 leading-relaxed">
                    Wear insulated gloves and ensure power is isolated before touching any terminal screws.
                  </p>
                </div>
              </div>
            </div>

            {/* Anti-Fraud Lineage Info */}
            <div className="bg-[#FCFBFF] border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
              <h4 className="text-xs font-bold text-[#29243A] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-mint-dark" />
                Evidence Provenance
              </h4>
              <ul className="text-[11px] text-[#817A91] space-y-1.5 font-mono">
                <li>• In-app capture lock (No gallery)</li>
                <li>• Android Play Integrity attested</li>
                <li>• SHA-256 local hash on record</li>
              </ul>
            </div>

            {/* Action Trigger */}
            <div>
              {!isRecording && !recorded && (
                <button
                  onClick={handleStartRecording}
                  className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm bg-blush hover:bg-blush-dark text-[#29243A] shadow-md shadow-blush/20 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>Start Recording (Live)</span>
                </button>
              )}

              {isRecording && (
                <button
                  onClick={handleStopRecording}
                  className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm bg-rose-500 hover:bg-rose-600 text-white shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <div className="w-3 h-3 bg-white rounded-sm" />
                  <span>Stop & Save Clip</span>
                </button>
              )}

              {recorded && (
                <div className="space-y-2">
                  <div className="p-3 bg-mint/40 border border-mint rounded-2xl text-center">
                    <span className="text-xs font-bold text-[#29243A] flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Evidence Signed & Saved
                    </span>
                  </div>
                  <button
                    onClick={handleStartRecording}
                    className="w-full py-2 rounded-xl text-xs font-semibold text-[#817A91] hover:text-[#29243A] flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake clip
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-xs text-[#817A91] hover:text-[#29243A] underline cursor-pointer"
        >
          ← Back to Task Plan
        </button>

        <button
          onClick={onCaptureComplete}
          disabled={!recorded}
          className={`py-3.5 px-8 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
            recorded
              ? 'bg-blush hover:bg-blush-dark text-[#29243A] shadow-md shadow-blush/20 active:scale-[0.99]'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
          }`}
        >
          <span>Complete Task & Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}