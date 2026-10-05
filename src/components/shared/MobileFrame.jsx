import React from 'react';
import { Wifi, WifiOff, BatteryMedium } from 'lucide-react';

export default function MobileFrame({ children, isOffline }) {
  return (
    <div className="flex justify-center items-center py-6 px-4">
      {/* Mobile Device Container */}
      <div className="w-full max-w-[420px] bg-slate-900 border-4 border-slate-700 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col min-h-[720px] relative">
        
        {/* Device Status Bar */}
        <div className="bg-slate-950 px-6 py-2.5 flex items-center justify-between text-xs text-slate-400 select-none border-b border-slate-800">
          <span className="font-semibold text-slate-200">10:45 AM</span>
          
          {/* Speaker / Camera Notch */}
          <div className="w-20 h-3.5 bg-slate-800 rounded-full mx-auto" />
          
          <div className="flex items-center gap-2">
            {isOffline ? (
              <span className="flex items-center gap-1 text-amber-400 text-[10px]">
                <WifiOff className="w-3.5 h-3.5" /> Offline
              </span>
            ) : (
              <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                <Wifi className="w-3.5 h-3.5" /> 4G
              </span>
            )}
            <BatteryMedium className="w-4 h-4 text-slate-300" />
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 bg-slate-950 text-slate-100 overflow-y-auto flex flex-col">
          {children}
        </div>

        {/* Android Navigation Bar Bar Indicator */}
        <div className="bg-slate-950 py-2 flex justify-center border-t border-slate-900">
          <div className="w-32 h-1 bg-slate-600 rounded-full" />
        </div>

      </div>
    </div>
  );
}