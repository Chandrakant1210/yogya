import React from 'react';
import { Smartphone, Monitor, Wifi, WifiOff, Award } from 'lucide-react';

export default function Navbar({ activeRole, setActiveRole, isOffline, setIsOffline }) {
  return (
    <header className="bg-white/90 backdrop-blur border-b border-slate-200/70 sticky top-0 z-50 px-4 lg:px-8 py-3.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand with Blush Pink Badge */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blush/30 text-[#29243A] rounded-2xl border border-blush shadow-xs">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-[#29243A] tracking-tight">Yogya</span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-lilac/30 text-[#29243A] font-bold border border-lilac/50">
                RPL-Assist 2.0
              </span>
            </div>
            <p className="text-xs text-[#817A91]">Offline-First Evidence-Centred RPL Platform</p>
          </div>
        </div>

        {/* Controls: Portal Switcher & Network Simulator */}
        <div className="flex items-center gap-3">
          
          {/* Switcher */}
          <div className="bg-[#FCFBFF] p-1 rounded-2xl border border-slate-200/80 flex items-center gap-1 shadow-inner">
            <button
              onClick={() => setActiveRole('worker')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeRole === 'worker'
                  ? 'bg-blush text-[#29243A] shadow-sm font-bold'
                  : 'text-[#817A91] hover:text-[#29243A]'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Candidate Portal</span>
            </button>

            <button
              onClick={() => setActiveRole('assessor')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeRole === 'assessor'
                  ? 'bg-blush text-[#29243A] shadow-sm font-bold'
                  : 'text-[#817A91] hover:text-[#29243A]'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Assessor Portal</span>
            </button>
          </div>

          {/* Network Simulator: Butter Yellow for Offline, Pistachio Mint for Online */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-xs ${
              isOffline
                ? 'bg-butter text-[#29243A] border-butter-dark/50'
                : 'bg-mint text-[#29243A] border-mint-dark/50'
            }`}
            title="Toggle network simulation"
          >
            {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
            <span>{isOffline ? 'Offline Mode' : 'Online (Sync)'}</span>
          </button>

        </div>

      </div>
    </header>
  );
}