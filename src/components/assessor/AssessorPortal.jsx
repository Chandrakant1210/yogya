import React, { useState } from 'react';
import AssessorQueue from './AssessorQueue';
import AssessorWorkspace from './AssessorWorkspace';

export default function AssessorPortal() {
  const [currentView, setCurrentView] = useState('queue'); // 'queue' or 'workspace'
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setCurrentView('workspace');
  };

  const handleBackToQueue = () => {
    setCurrentView('queue');
  };

  const handleEvaluationComplete = () => {
    // Return to queue after signing off
    setCurrentView('queue');
  };

  return (
    <div className="flex-1 flex flex-col w-full">
      {currentView === 'queue' ? (
        <AssessorQueue onSelectCandidate={handleSelectCandidate} />
      ) : (
        <AssessorWorkspace
          candidate={selectedCandidate}
          onBack={handleBackToQueue}
          onComplete={handleEvaluationComplete}
        />
      )}
    </div>
  );
}