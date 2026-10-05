import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, HardDrive, RefreshCw, FileText, ArrowRight, Wifi, WifiOff } from 'lucide-react';

export default function WorkerReviewSync({ isOffline, onRestart }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [synced, setSynced] = useState(!isOffline);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSynced(true);
    }, 2000);
  };

  const tasksList = [
    { title: 'Task 1: Wire and test a socket point', hash: 'sha256:9f2c...e1', time: '10:48 AM' },
    { title: 'Task 2: Test the circuit continuity', hash: 'sha256:a14b...92', time: '10:52 AM' },
    { title: 'Task 3: Find fault in lamp circuit', hash: 'sha256:d83c...f0', time: '10:56 AM' },
    { title: 'Task 4: Spoken viva explanation', hash: 'sha256:77bc...19', time: '11:01 AM' },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between text-[#29243A]">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between text-xs text-[#817A91] mb-6 pb-3 border-b border-slate-100">
          <span className="font-semibold text-[#29243A]">Review & Sync Receipt</span>
          
          <span className="flex items-center gap-1.5 text-[#29243A] text-xs font-bold bg-mint/50 px-3 py-1 rounded-full border border-mint">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> All 4 Tasks Done
          </span>
        </div>

        <h2 className="text-2xl font-bold text-[#29243A] mb-1">Evidence Pack Signed</h2>
        <p className="text-xs text-[#817A91] mb-6">
          Your practical demonstrations are recorded and protected with cryptographic signatures.
        </p>

        {/* 2-Column Responsive Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Left: Task List with Hash Tags */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-[#29243A] uppercase tracking-wider block mb-1">
              Signed Task Lineage
            </span>

            {tasksList.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FCFBFF] border border-slate-200/80 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs"
              >
                <div>
                  <div className="text-xs font-bold text-[#29243A]">{item.title}</div>
                  <div className="text-[10px] text-[#817A91] font-mono mt-0.5">{item.hash} • {item.time}</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-mint/40 px-2 py-0.5 rounded-md border border-mint">
                  ✓ Signed
                </span>
              </div>
            ))}
          </div>

          {/* Right: Sync Status & Audit Manifest */}
          <div className="flex flex-col justify-between bg-[#FCFBFF] border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#29243A] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  C2PA Audit Receipt
                </span>
                <span className="text-[10px] font-mono bg-slate-100 text-[#817A91] px-2 py-0.5 rounded border border-slate-200">
                  SESSION #8841
                </span>
              </div>

              {/* Code snippet manifest like PDF page 11 */}
              <div className="bg-slate-900 text-slate-200 rounded-xl p-3 font-mono text-[11px] leading-relaxed mb-4">
                <div className="text-blush">device_attestation: "play_integrity:ok"</div>
                <div className="text-mint">capture_challenge: "word:LAMP"</div>
                <div className="text-butter">quality_checks: "blur:ok, light:ok"</div>
                <div className="text-slate-400">sync_status: {isOffline ? '"offline_enqueued"' : '"server_receipt_5521"'}</div>
              </div>

              {/* Network Status Banner */}
              {isOffline ? (
                <div className="p-3 rounded-xl bg-butter/50 border border-butter-dark/50 text-xs text-[#29243A] flex items-center gap-2">
                  <WifiOff className="w-4 h-4 shrink-0 text-amber-800" />
                  <span>Stored securely on device. Will auto-sync when network returns.</span>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-mint/50 border border-mint text-xs text-[#29243A] flex items-center gap-2">
                  <Wifi className="w-4 h-4 shrink-0 text-emerald-700" />
                  <span>Synchronised with Assessor Portal (Candidate C-1042 ready for review).</span>
                </div>
              )}
            </div>

            {/* Sync Action */}
            <div className="pt-4 mt-2">
              <button
                onClick={handleManualSync}
                disabled={isSyncing || isOffline}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isOffline
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    : 'bg-mint hover:bg-mint-dark text-[#29243A] shadow-xs'
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Evidence Pack Now'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
        <button
          onClick={onRestart}
          className="text-xs text-[#817A91] hover:text-[#29243A] underline cursor-pointer"
        >
          Start New Assessment
        </button>

        <button
          onClick={onRestart}
          className="py-3.5 px-8 rounded-2xl font-bold text-sm bg-blush hover:bg-blush-dark text-[#29243A] shadow-md shadow-blush/20 active:scale-[0.99] flex items-center gap-2 cursor-pointer"
        >
          <span>Return to Home</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}