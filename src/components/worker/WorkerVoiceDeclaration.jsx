import React, { useState } from 'react';
import { Mic, MicOff, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Volume2 } from 'lucide-react';

export default function WorkerVoiceDeclaration({ onNext, onBack, selectedTrade, setSelectedTrade }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(
    "I have 8 years of experience doing domestic electrical work: house wiring, switch socket installation, testing with multimeter, and troubleshooting lighting circuits."
  );

  // Official QP/NOS Matches
  const matchedTrades = [
    {
      id: 'QP-ELE-3101',
      title: 'Domestic Electrician',
      nsqf: 'Level 4',
      code: 'ELE/Q6001',
      confidence: 96,
      standards: ['Safe Isolation', 'Cable & Protection Selection', 'Termination & Testing'],
      isRecommended: true
    },
    {
      id: 'QP-ELE-3102',
      title: 'Industrial Electrician',
      nsqf: 'Level 4',
      code: 'ELE/Q6002',
      confidence: 74,
      standards: ['Panel Wiring', '3-Phase Motor Control'],
      isRecommended: false
    }
  ];

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => setIsRecording(false), 3000);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between text-[#29243A]">
      
      {/* Step Header */}
      <div>
        <div className="flex items-center justify-between text-xs text-[#817A91] mb-6 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1 hover:text-[#29243A] cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-[#29243A]">Step 2 of 4 • Voice Declaration</span>
          </div>
          <span className="flex items-center gap-1.5 text-[#29243A] text-xs font-bold bg-mint/50 px-3 py-1 rounded-full border border-mint">
            <CheckCircle2 className="w-3.5 h-3.5" /> Audio Engine Ready
          </span>
        </div>

        <h2 className="text-2xl font-bold text-[#29243A] mb-1">Tell us about your work</h2>
        <p className="text-xs text-[#817A91] mb-6">
          Tap the microphone and describe what jobs you do every day, your tools, and your experience.
        </p>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Left Column: Voice Recording (Soft Lilac for AI/Speech) */}
          <div className="bg-[#FCFBFF] border border-slate-200/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
            <button
              onClick={handleToggleRecord}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                isRecording
                  ? 'bg-rose-400 text-white animate-pulse ring-8 ring-rose-100'
                  : 'bg-lilac hover:bg-lilac-dark text-[#29243A] active:scale-95'
              }`}
            >
              {isRecording ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
            </button>

            <span className="mt-4 text-sm font-bold text-[#29243A]">
              {isRecording ? "Listening... (Speak now)" : "Tap to Speak"}
            </span>
            <span className="text-xs text-[#817A91] mt-1">
              Supports Hindi, English & regional dialects
            </span>

            {/* Transcript Preview */}
            <div className="w-full mt-6 text-left bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-[#817A91] mb-2">
                <span className="font-bold uppercase tracking-wider text-[#29243A] text-[10px]">
                  Spoken Transcript
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-[#29243A] cursor-pointer">
                  <Volume2 className="w-3 h-3 text-lilac-dark" /> Playback
                </span>
              </div>
              <p className="text-xs text-[#29243A] italic leading-relaxed">
                "{transcript}"
              </p>
            </div>
          </div>

          {/* Right Column: Matched QP/NOS */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-lilac-dark" />
                <span className="text-xs font-bold text-[#29243A] uppercase tracking-wider">
                  AI Standard Matching (Official QP/NOS)
                </span>
              </div>

              <div className="space-y-3">
                {matchedTrades.map((trade) => {
                  const isSelected = selectedTrade === trade.id;
                  return (
                    <div
                      key={trade.id}
                      onClick={() => setSelectedTrade(trade.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blush/20 border-blush shadow-xs ring-2 ring-blush/40'
                          : 'bg-[#FCFBFF] border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#29243A]">{trade.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-[#29243A] font-semibold border border-slate-200">
                            {trade.nsqf}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#29243A] bg-mint/50 px-2.5 py-0.5 rounded-full border border-mint">
                          {trade.confidence}% Match
                        </span>
                      </div>

                      <div className="text-xs text-[#817A91] mb-2 font-mono">Code: {trade.code}</div>

                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {trade.standards.map((std, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-white border border-slate-200/80 text-[#29243A] font-medium px-2 py-0.5 rounded-md"
                          >
                            ✓ {std}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-[11px] text-[#817A91] italic mt-3">
              Official occupational content remains authoritative. Qualified assessor confirms the qualification.
            </p>
          </div>

        </div>
      </div>

      {/* Navigation Button */}
      <div className="pt-4 border-t border-slate-100 flex justify-end">
        <button
          onClick={onNext}
          className="py-3.5 px-8 rounded-2xl font-bold text-sm bg-blush hover:bg-blush-dark text-[#29243A] shadow-md shadow-blush/20 active:scale-[0.99] flex items-center gap-2 cursor-pointer"
        >
          <span>Confirm Trade & View Plan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}