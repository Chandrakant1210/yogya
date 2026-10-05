import React from 'react';
import { ShieldAlert, Video, Mic, ArrowRight, ArrowLeft, Clock, HardDrive } from 'lucide-react';

export default function WorkerTaskPlan({ onStartTask, onBack }) {
  const tasks = [
    {
      id: 1,
      title: 'Wire and test a socket point',
      duration: '4-5 mins',
      type: 'Safety Gate',
      typeColor: 'bg-butter/60 text-[#29243A] border-butter-dark/50 font-bold',
      icon: ShieldAlert,
      description: 'Isolate main supply, strip cables safely, wire 3-pin socket with proper earth and polarity.',
      status: 'Ready'
    },
    {
      id: 2,
      title: 'Test the circuit',
      duration: '2-3 mins',
      type: 'Video Evidence',
      typeColor: 'bg-slate-100 text-[#29243A] border-slate-200',
      icon: Video,
      description: 'Use multimeter or neon tester to verify voltage, phase, neutral and earth continuity.',
      status: 'Pending'
    },
    {
      id: 3,
      title: 'Find a fault in a lamp circuit',
      duration: '3-4 mins',
      type: 'Video Evidence',
      typeColor: 'bg-slate-100 text-[#29243A] border-slate-200',
      icon: Video,
      description: 'Identify simulated loose neutral wire or blown fuse and demonstrate troubleshooting method.',
      status: 'Pending'
    },
    {
      id: 4,
      title: 'Explain your steps (Oral Viva)',
      duration: '2 mins',
      type: 'Voice Viva',
      typeColor: 'bg-lilac/40 text-[#29243A] border-lilac/60 font-semibold',
      icon: Mic,
      description: 'Answer two NOS-derived oral questions: "What check do you perform before touching wires?"',
      status: 'Pending'
    }
  ];

  return (
    <div className="flex-1 flex flex-col justify-between text-[#29243A]">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between text-xs text-[#817A91] mb-6 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1 hover:text-[#29243A] cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-[#29243A]">Step 3 of 4 • Assessment Plan</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-[#29243A] font-bold border border-slate-200">
              0 of 4 done
            </span>
            {/* Pistachio Mint for Saved on Device */}
            <span className="flex items-center gap-1.5 text-[#29243A] text-xs font-bold bg-mint/50 px-3 py-1 rounded-full border border-mint">
              <HardDrive className="w-3.5 h-3.5" /> Saved on device
            </span>
          </div>
        </div>

        {/* Plan Header */}
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#29243A]">4 Short Practical Tasks</h2>
            <p className="text-xs text-[#817A91] mt-1">
              Optimised evidence set covering all Domestic Electrician (Level 4) criteria.
            </p>
          </div>
        </div>

        {/* Task Cards List */}
        <div className="space-y-3 mb-6">
          {tasks.map((task) => {
            const Icon = task.icon;
            return (
              <div
                key={task.id}
                className="bg-[#FCFBFF] border border-slate-200/80 hover:border-slate-300 rounded-2xl p-4 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-[#29243A] shadow-xs mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-[#29243A]">{task.title}</span>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${task.typeColor}`}>
                        {task.type}
                      </span>
                    </div>
                    <p className="text-xs text-[#817A91] leading-relaxed max-w-xl">
                      {task.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="flex items-center gap-1 text-[11px] text-[#817A91]">
                    <Clock className="w-3 h-3" /> {task.duration}
                  </span>
                  <button
                    onClick={() => onStartTask(task.id)}
                    className="py-1.5 px-4 rounded-xl text-xs font-bold bg-blush hover:bg-blush-dark text-[#29243A] cursor-pointer shadow-xs active:scale-95 transition-all"
                  >
                    Start
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Offline reassurance note */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-[#817A91] flex items-center justify-between">
          <span>Pause any time. All captured evidence is stored securely on your device.</span>
          <span className="text-[#29243A] font-semibold">Total time: ~15 mins</span>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-xs text-[#817A91] hover:text-[#29243A] underline cursor-pointer"
        >
          Change Trade Selection
        </button>

        <button
          onClick={() => onStartTask(1)}
          className="py-3.5 px-8 rounded-2xl font-bold text-sm bg-blush hover:bg-blush-dark text-[#29243A] shadow-md shadow-blush/20 active:scale-[0.99] flex items-center gap-2 cursor-pointer"
        >
          <span>Start Task 1 (Socket Point)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}