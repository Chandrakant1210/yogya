import React, { useState } from 'react';
import { 
  ArrowLeft, Lock, Unlock, Play, CheckCircle2, AlertTriangle, 
  ShieldCheck, ShieldAlert, Sparkles, FileSignature, Award, Check
} from 'lucide-react';

export default function AssessorWorkspace({ candidate, onBack, onComplete }) {
  // Rubric scores: key = criterionId, value = 0, 1, or 2
  const [scores, setScores] = useState({
    isolation: null,
    cable: null,
    termination: null,
    testing: null,
  });

  const [isLocked, setIsLocked] = useState(false);
  const [justification, setJustification] = useState('');
  const [isSigned, setIsSigned] = useState(false);

  const criteria = [
    { id: 'isolation', label: 'PC1: Safe isolation before work', mandatory: true, nos: 'ELE/N3101' },
    { id: 'cable', label: 'PC2: Correct cable & MCB selection', mandatory: false, nos: 'ELE/N3101' },
    { id: 'termination', label: 'PC3: Socket termination & earth wire', mandatory: false, nos: 'ELE/N3102' },
    { id: 'testing', label: 'PC4: Testing (continuity / polarity)', mandatory: false, nos: 'ELE/N3103' },
  ];

  const allScored = Object.values(scores).every((val) => val !== null);

  const handleSelectScore = (criterionId, val) => {
    if (isLocked) return;
    setScores((prev) => ({ ...prev, [criterionId]: val }));
  };

  // Safety gate logic (from Section 12: Policy-as-Code)
  const mandatoryPassed = scores.isolation === 2;
  const totalScore = Object.values(scores).reduce((acc, curr) => acc + (curr || 0), 0);
  const isRecommended = mandatoryPassed && totalScore >= 6;

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-xl text-[#29243A] cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#29243A]">
                {candidate?.name || 'Ramesh Kumar'}
              </h2>
              <span className="text-xs font-mono text-[#817A91]">
                ({candidate?.id || 'C-1042'})
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-[#29243A] border border-slate-200">
                Task 1: Socket Point
              </span>
            </div>
            <p className="text-xs text-[#817A91] mt-0.5">
              QP: Domestic Electrician (NSQF Level 4) • Live Captured Video Evidence
            </p>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-mint/50 text-[#29243A] font-bold border border-mint flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Play Integrity Verified
          </span>
        </div>
      </div>

      {/* 3-Column Blind-First Assessment Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ════════════════════════════════════════
            COL 1: VIDEO EVIDENCE PLAYER (4 Cols)
           ════════════════════════════════════════ */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#29243A] block mb-2">
              1. Captured Video Evidence
            </span>

            {/* Video Viewport Mockup */}
            <div className="w-full h-52 bg-slate-950 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center shadow-inner mb-3">
              <div className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white cursor-pointer transition-all">
                <Play className="w-5 h-5 ml-0.5" />
              </div>
              <span className="absolute bottom-2.5 right-3 text-[10px] text-white/70 font-mono bg-black/60 px-2 py-0.5 rounded">
                02:14 / 04:30
              </span>
              <span className="absolute top-2.5 left-3 text-[10px] font-bold text-butter bg-black/60 px-2 py-0.5 rounded-full">
                Challenge: LAMP
              </span>
            </div>

            {/* Metadata Tags */}
            <div className="text-[11px] text-[#817A91] space-y-1 mb-4 font-mono bg-[#FCFBFF] p-3 rounded-xl border border-slate-200/70">
              <div>• Hash: sha256:9f2c...e1 (Tamper-evident)</div>
              <div>• GPS: 28.6139° N, 77.2090° E (Field Verified)</div>
              <div>• Device: Pixel 7a (Play Integrity: Hardware backed)</div>
            </div>

            {/* Audio Transcript */}
            <div className="bg-[#FCFBFF] border border-slate-200/80 rounded-2xl p-3.5 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#29243A] block mb-1">
                Spoken Audio Transcript (Hindi)
              </span>
              <p className="text-xs text-[#29243A] italic leading-relaxed">
                "Pehle maine main board se MCB isolate kiya. Tester lagakar dekha koi supply nahi hai. Uske baad 3-pin socket me red phase aur black neutral ko tight kiya."
              </p>
            </div>
          </div>
        </div>


        {/* ════════════════════════════════════════
            COL 2: BLIND RUBRIC SCORING (4 Cols)
           ════════════════════════════════════════ */}
        <div className="lg:col-span-4 bg-[#FCFBFF] border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200/70">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#29243A] block">
                  2. Blind Rubric Scoring
                </span>
                <span className="text-[10px] text-[#817A91]">Human scores before seeing AI</span>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-[#29243A]">
                Score: {totalScore}/8
              </span>
            </div>

            {/* Criteria List */}
            <div className="space-y-4">
              {criteria.map((c) => (
                <div key={c.id} className="bg-white border border-slate-200/70 rounded-xl p-3 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#29243A]">
                      {c.label}
                    </span>
                    {c.mandatory && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-butter text-[#29243A] border border-butter-dark/40">
                        Must Pass
                      </span>
                    )}
                  </div>

                  {/* 0, 1, 2 Score Buttons */}
                  <div className="flex gap-2">
                    {[
                      { val: 0, label: '0 Not Done' },
                      { val: 1, label: '1 Partial' },
                      { val: 2, label: '2 Competent' },
                    ].map(({ val, label }) => {
                      const isSelected = scores[c.id] === val;
                      return (
                        <button
                          key={val}
                          disabled={isLocked}
                          onClick={() => handleSelectScore(c.id, val)}
                          className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blush text-[#29243A] shadow-xs font-bold ring-1 ring-blush-dark'
                              : 'bg-slate-50 text-[#817A91] hover:bg-slate-100 border border-slate-200/70'
                          } ${isLocked ? 'cursor-not-allowed opacity-90' : ''}`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lock Score Action */}
          <div className="pt-4 mt-4 border-t border-slate-200/70">
            {!isLocked ? (
              <button
                onClick={() => setIsLocked(true)}
                disabled={!allScored}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  allScored
                    ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs active:scale-[0.99]'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Score to Reveal AI Hints</span>
              </button>
            ) : (
              <div className="p-2.5 rounded-xl bg-mint/50 border border-mint text-center text-xs font-bold text-[#29243A] flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Score Locked (Anchoring Protected)</span>
              </div>
            )}
          </div>
        </div>


        {/* ════════════════════════════════════════
            COL 3: AI HINTS & SAFETY GATE (4 Cols)
           ════════════════════════════════════════ */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-[#29243A]">
                3. AI Hints & Safety Gate
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-lilac/40 text-[#29243A] font-bold">
                Assistance Only
              </span>
            </div>

            {/* If Locked, Reveal AI Hints */}
            {isLocked ? (
              <div className="space-y-3">
                {/* AI Hint 1 */}
                <div className="p-3 bg-mint/40 border border-mint rounded-xl text-xs shadow-2xs">
                  <div className="font-bold text-[#29243A] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" /> PPE: Insulated Gloves Detected
                  </div>
                  <div className="text-[10px] text-emerald-800 mt-0.5">
                    Calibrated Confidence: 94% (High)
                  </div>
                </div>

                {/* AI Hint 2 */}
                <div className="p-3 bg-butter/40 border border-butter rounded-xl text-xs shadow-2xs">
                  <div className="font-bold text-[#29243A] flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-800" /> Neon Tester Used
                  </div>
                  <div className="text-[10px] text-amber-800 mt-0.5">
                    Calibrated Confidence: 71% (Medium uncertainty)
                  </div>
                </div>

                {/* AI Hint 3 */}
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs shadow-2xs">
                  <div className="font-bold text-rose-800 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-600" /> Isolation Step Not Confirmed by Vision
                  </div>
                  <div className="text-[10px] text-rose-700 mt-0.5">
                    Assessor owns final judgement. Check manual footage.
                  </div>
                </div>

                {/* Safety Gate Evaluation Box */}
                <div className="mt-4 p-4 rounded-2xl bg-[#FCFBFF] border border-slate-200/80 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#29243A] block mb-1">
                    Policy-as-Code Outcome
                  </span>
                  
                  {isRecommended ? (
                    <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                      <Award className="w-4 h-4" /> Recommended for Certification
                    </div>
                  ) : (
                    <div className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Recommend Bridge Training
                    </div>
                  )}

                  <p className="text-[10px] text-[#817A91] mt-1">
                    Rule: Mandatory Isolation criteria (min score: 2) & total score &ge; 6.
                  </p>
                </div>
              </div>
            ) : (
              /* Hidden Banner before Lock */
              <div className="h-64 border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                <Lock className="w-8 h-8 text-slate-300 mb-2" />
                <h4 className="text-xs font-bold text-[#29243A]">AI Hints are Hidden</h4>
                <p className="text-[11px] text-[#817A91] mt-1 max-w-xs">
                  Score the candidate on the rubric in Column 2 and click <strong>"Lock Score"</strong> to reveal multimodal AI assistance.
                </p>
              </div>
            )}
          </div>

          {/* Final Sign-Off Action */}
          {isLocked && (
            <div className="pt-4 border-t border-slate-100">
              {!isSigned ? (
                <button
                  onClick={() => {
                    setIsSigned(true);
                    setTimeout(() => onComplete?.(), 1500);
                  }}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-blush hover:bg-blush-dark text-[#29243A] shadow-md shadow-blush/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
                >
                  <FileSignature className="w-4 h-4" />
                  <span>Sign & Issue Decision (RFC 3161)</span>
                </button>
              ) : (
                <div className="p-3 bg-mint text-[#29243A] rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-800" />
                  <span>Evaluation Digitally Signed & Anchored</span>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}