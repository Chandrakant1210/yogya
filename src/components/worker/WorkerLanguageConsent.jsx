import React, { useState } from 'react';
import { Volume2, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

const LANGUAGES = [
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'en', label: 'English', native: 'English' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
];

export default function WorkerLanguageConsent({
  selectedLanguage,
  setSelectedLanguage,
  consentGiven,
  setConsentGiven,
  onNext,
  onBack,
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayConsentAudio = () => {
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 2500);
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
            <span className="font-semibold text-[#29243A]">Step 1 of 4 • Language & Consent</span>
          </div>
          
          {/* Pistachio Mint for Saved Status */}
          <span className="flex items-center gap-1.5 text-[#29243A] text-xs font-bold bg-mint/50 px-3 py-1 rounded-full border border-mint">
            <CheckCircle2 className="w-3.5 h-3.5" /> Saved
          </span>
        </div>

        {/* Section: Choose Language */}
        <h2 className="text-2xl font-bold text-[#29243A] mb-1">Choose your language</h2>
        <p className="text-xs text-[#817A91] mb-5">Select the language you feel most comfortable speaking in.</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage === lang.label;
            return (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.label)}
                className={`py-3.5 px-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blush/25 border-blush shadow-xs font-bold ring-2 ring-blush/50 text-[#29243A]'
                    : 'bg-[#FCFBFF] border-slate-200/80 text-[#29243A] hover:border-slate-300'
                }`}
              >
                <div className="text-sm font-semibold">{lang.label}</div>
                <div className="text-xs text-[#817A91] font-normal">{lang.native}</div>
              </button>
            );
          })}
        </div>

        {/* Section: Consent Card */}
        <div className="bg-[#FCFBFF] border border-slate-200/80 rounded-2xl p-5 mb-6 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#29243A] uppercase tracking-wider">
              Your Consent
            </span>
            <button
              onClick={handlePlayConsentAudio}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                isPlayingAudio
                  ? 'bg-lilac text-[#29243A] animate-pulse'
                  : 'bg-lilac/30 text-[#29243A] hover:bg-lilac/50 border border-lilac/60'
              }`}
              title="Listen in your language"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isPlayingAudio ? 'Speaking in Hindi...' : 'Listen in Audio'}</span>
            </button>
          </div>

          <p className="text-xs text-[#817A91] leading-relaxed mb-4">
            We record your voice and work videos only to assess your skills. Your assessor and the agency can inspect them.
          </p>

          {/* Consent Switch with Blush Accent */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200/70">
            <span className="text-sm font-semibold text-[#29243A]">I agree</span>
            <button
              onClick={() => setConsentGiven(!consentGiven)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                consentGiven ? 'bg-blush justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary Action Button (Blush Pink) */}
      <div className="pt-4 border-t border-slate-100 flex justify-end">
        <button
          onClick={onNext}
          disabled={!consentGiven}
          className={`py-3.5 px-8 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
            consentGiven
              ? 'bg-blush hover:bg-blush-dark text-[#29243A] shadow-md shadow-blush/20 active:scale-[0.99]'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
          }`}
        >
          <span>Agree and continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}