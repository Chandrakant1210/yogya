import React, { useState } from 'react';
import WorkerHome from './WorkerHome';
import WorkerLanguageConsent from './WorkerLanguageConsent';
import WorkerVoiceDeclaration from './WorkerVoiceDeclaration';
import WorkerTaskPlan from './WorkerTaskPlan';
import WorkerLiveCapture from './WorkerLiveCapture';
import WorkerReviewSync from './WorkerReviewSync';

export default function WorkerFlow({ isOffline }) {
  // Navigation step state: 'home', 'language', 'declaration', 'plan', 'capture', 'review'
  const [currentStep, setCurrentStep] = useState('home');

  // Shared state
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
  const [consentGiven, setConsentGiven] = useState(true);
  const [selectedTrade, setSelectedTrade] = useState('QP-ELE-3101');
  const [activeTaskId, setActiveTaskId] = useState(1);

  return (
    <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto my-auto py-4">
      {/* 1. Home Screen */}
      {currentStep === 'home' && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 lg:p-12 shadow-sm">
          <WorkerHome
            onStart={() => setCurrentStep('language')}
            onResume={() => setCurrentStep('plan')}
          />
        </div>
      )}

      {/* 2. Language & Consent */}
      {currentStep === 'language' && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 lg:p-12 shadow-sm">
          <WorkerLanguageConsent
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            consentGiven={consentGiven}
            setConsentGiven={setConsentGiven}
            onNext={() => setCurrentStep('declaration')}
            onBack={() => setCurrentStep('home')}
          />
        </div>
      )}

      {/* 3. Voice Declaration & QP/NOS Matching */}
      {currentStep === 'declaration' && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 lg:p-12 shadow-sm">
          <WorkerVoiceDeclaration
            selectedTrade={selectedTrade}
            setSelectedTrade={setSelectedTrade}
            onNext={() => setCurrentStep('plan')}
            onBack={() => setCurrentStep('language')}
          />
        </div>
      )}

      {/* 4. Assessment Task Plan */}
      {currentStep === 'plan' && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 lg:p-10 shadow-sm">
          <WorkerTaskPlan
            onStartTask={(taskId) => {
              setActiveTaskId(taskId);
              setCurrentStep('capture');
            }}
            onBack={() => setCurrentStep('declaration')}
          />
        </div>
      )}

      {/* 5. Live Evidence Camera Capture */}
      {currentStep === 'capture' && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 lg:p-10 shadow-sm">
          <WorkerLiveCapture
            taskId={activeTaskId}
            onCaptureComplete={() => setCurrentStep('review')}
            onBack={() => setCurrentStep('plan')}
          />
        </div>
      )}

      {/* 6. Review & Sync Receipt */}
      {currentStep === 'review' && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 lg:p-10 shadow-sm">
          <WorkerReviewSync
            isOffline={isOffline}
            onRestart={() => setCurrentStep('home')}
          />
        </div>
      )}
    </div>
  );
}