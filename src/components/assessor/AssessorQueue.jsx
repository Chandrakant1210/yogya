import React, { useState } from 'react';
import { User, CheckCircle2, Clock, AlertTriangle, ShieldAlert, ArrowRight, Filter, Search } from 'lucide-react';

export default function AssessorQueue({ onSelectCandidate }) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample candidate dataset matching Section 11
  const candidates = [
    {
      id: 'C-1042',
      name: 'Ramesh Kumar',
      trade: 'Domestic Electrician (Level 4)',
      experience: '8 years',
      tasksCompleted: '4 of 4',
      status: 'Needs score',
      statusColor: 'bg-butter text-[#29243A] border-butter-dark/60 font-bold',
      time: '12m ago',
      urgent: true
    },
    {
      id: 'C-0877',
      name: 'Suresh Patel',
      trade: 'Domestic Electrician (Level 4)',
      experience: '6 years',
      tasksCompleted: '4 of 4',
      status: 'Ready to sign',
      statusColor: 'bg-mint text-[#29243A] border-mint-dark font-bold',
      time: '1h ago',
      urgent: false
    },
    {
      id: 'C-0911',
      name: 'Anjali Verma',
      trade: 'Domestic Electrician (Level 4)',
      experience: '5 years',
      tasksCompleted: '3 of 4',
      status: 'Retake asked',
      statusColor: 'bg-rose-100 text-rose-800 border-rose-200 font-semibold',
      time: '3h ago',
      urgent: false
    },
    {
      id: 'C-0654',
      name: 'Mohammed Ali',
      trade: 'Domestic Electrician (Level 4)',
      experience: '10 years',
      tasksCompleted: '4 of 4',
      status: 'Adjudication',
      statusColor: 'bg-lilac text-[#29243A] border-lilac-dark font-bold',
      time: 'Yesterday',
      urgent: true
    },
  ];

  const filteredCandidates = candidates.filter((c) => {
    if (activeTab === 'Needs score') return c.status === 'Needs score';
    if (activeTab === 'Adjudicate') return c.status === 'Adjudication';
    return true;
  });

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm">
      
      {/* Queue Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-[#29243A]">Review Queue</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-[#29243A] font-semibold border border-slate-200">
              Agency A • Field Batch #12
            </span>
          </div>
          <p className="text-xs text-[#817A91]">
            Evidence packages synced from field workers ready for blind evaluation.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-[#FCFBFF] p-1 rounded-2xl border border-slate-200/80">
          {['All', 'Needs score', 'Adjudicate'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-blush text-[#29243A] font-bold shadow-xs'
                  : 'text-[#817A91] hover:text-[#29243A]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Candidate List Cards */}
      <div className="divide-y divide-slate-100 mt-2">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            onClick={() => onSelectCandidate(candidate)}
            className="py-4.5 px-3 rounded-2xl hover:bg-[#FCFBFF] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#29243A] font-bold text-sm shadow-2xs">
                {candidate.id.replace('C-', '')}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-base text-[#29243A]">{candidate.name}</span>
                  <span className="text-xs font-mono text-[#817A91]">({candidate.id})</span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${candidate.statusColor}`}>
                    {candidate.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 text-xs text-[#817A91]">
                  <span>{candidate.trade}</span>
                  <span>•</span>
                  <span>Exp: {candidate.experience}</span>
                  <span>•</span>
                  <span>Tasks: {candidate.tasksCompleted}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <span className="text-xs text-[#817A91] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {candidate.time}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCandidate(candidate);
                }}
                className="py-2 px-4 rounded-xl text-xs font-bold bg-blush hover:bg-blush-dark text-[#29243A] shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
              >
                <span>Evaluate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#817A91]">
        <span>Showing {filteredCandidates.length} candidate files</span>
        <span>Adjudication policy: Double-marking enabled on 20% sample</span>
      </div>

    </div>
  );
}
