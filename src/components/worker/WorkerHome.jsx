import React from 'react';
import { Mic, HardDrive, UserCheck, ArrowRight, Play } from 'lucide-react';

export default function WorkerHome({ onStart, onResume }) {
  return (
    <div className="flex-1 flex flex-col justify-between text-[#29243A]">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <span className="text-xs font-bold tracking-widest text-[#29243A] uppercase">
          YOGYA • RPL-ASSIST
        </span>
        <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-[#29243A] font-medium border border-slate-200/70">
          English
        </span>
      </div>

      {/* Main Hero Message */}
      <div className="my-auto py-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#29243A] mb-4 leading-tight">
          Your skills,<br />
          <span className="underline decoration-blush decoration-8 underline-offset-4">on record.</span>
        </h1>
        <p className="text-[#817A91] text-base leading-relaxed mb-8 max-w-xl">
          Show what you can do. Your assessor checks it. Works without internet.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
          <button
            onClick={onStart}
            className="flex-1 py-4 px-6 rounded-2xl bg-blush hover:bg-blush-dark active:scale-[0.99] text-[#29243A] font-bold text-base flex items-center justify-center gap-3 shadow-md shadow-blush/20 transition-all cursor-pointer"
          >
            <span>Start my assessment</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onResume}
            className="py-4 px-6 rounded-2xl bg-slate-100/80 hover:bg-slate-200/70 active:scale-[0.99] text-[#29243A] font-semibold text-sm border border-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 text-[#29243A]" />
            <span>Continue where I left off</span>
          </button>
        </div>
      </div>

      {/* 3 Core Value Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-100">
        
        {/* Speak - Soft Lilac */}
        <div className="bg-[#FCFBFF] border border-slate-200/60 rounded-2xl p-4 flex items-center gap-3 shadow-2xs">
          <div className="p-2.5 rounded-xl bg-lilac/30 text-[#29243A] border border-lilac/50">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#29243A]">Speak</div>
            <div className="text-[11px] text-[#817A91]">No typing needed</div>
          </div>
        </div>

        {/* Offline - Butter Yellow */}
        <div className="bg-[#FCFBFF] border border-slate-200/60 rounded-2xl p-4 flex items-center gap-3 shadow-2xs">
          <div className="p-2.5 rounded-xl bg-butter/50 text-[#29243A] border border-butter">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#29243A]">Offline</div>
            <div className="text-[11px] text-[#817A91]">Saved on phone</div>
          </div>
        </div>

        {/* Human - Pistachio Mint */}
        <div className="bg-[#FCFBFF] border border-slate-200/60 rounded-2xl p-4 flex items-center gap-3 shadow-2xs">
          <div className="p-2.5 rounded-xl bg-mint/50 text-[#29243A] border border-mint">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#29243A]">Human</div>
            <div className="text-[11px] text-[#817A91]">Assessor decides</div>
          </div>
        </div>

      </div>

    </div>
  );
}