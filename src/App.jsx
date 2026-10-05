import React, { useState } from 'react';
import Navbar from './components/shared/Navbar';
import WorkerFlow from './components/worker/WorkerFlow';
import AssessorPortal from './components/assessor/AssessorPortal';

export default function App() {
  // Toggle between Candidate Portal and Assessor Portal
  const [activeRole, setActiveRole] = useState('worker');
  
  // Offline simulation state for field testing
  const [isOffline, setIsOffline] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCFBFF] text-[#29243A] flex flex-col font-sans selection:bg-blush/40 selection:text-[#29243A]">
      {/* Top Navigation */}
      <Navbar
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        {activeRole === 'worker' ? (
          <div className="flex-1 flex flex-col justify-center">
            <WorkerFlow isOffline={isOffline} />
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center">
            <AssessorPortal />
          </div>
        )}
      </main>
    </div>
  );
}