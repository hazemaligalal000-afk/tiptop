"use client";

import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { usePqqStore } from "../store/usePqqStore";
import { Step1CompanyInfo } from "./Step1CompanyInfo";
import { Step2Organisation } from "./Step2Organisation";
import { Step3Capabilities } from "./Step3Capabilities";
import { Step4ProjectExperience } from "./Step4ProjectExperience";
import { Step5Quality } from "./Step5Quality";
import { Step6Capacity } from "./Step6Capacity";

export function PqqWizard() {
  const { currentStep, totalSteps, nextStep, prevStep, data } = usePqqStore();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1CompanyInfo />;
      case 2:
        return <Step2Organisation />;
      case 3:
        return <Step3Capabilities />;
      case 4:
        return <Step4ProjectExperience />;
      case 5:
        return <Step5Quality />;
      case 6:
        return <Step6Capacity />;
      case 7:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-black">Review & Submit</h2>
            <p className="text-sm text-black">Please review your PQQ profile before submission.</p>
            <pre className="bg-slate-100 p-4 rounded-md text-xs overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        );
      default:
        return (
          <div className="space-y-4 text-center py-12">
            <h2 className="text-xl font-semibold text-black">Step {currentStep}</h2>
            <p className="text-sm text-black">This section is currently under development.</p>
          </div>
        );
    }
  };

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const payload = {
        ...data,
        userId: user ? user.id : null // pass user ID if logged in
      };

      const response = await fetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.success) {
        alert(`Profile Submitted! Your calculated VQI Score is ${result.calculatedScore} (${result.badge} Tier)`);
        // In a real app, redirect to dashboard
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting profile');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm font-medium text-black mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Completed</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden min-h-[400px] flex flex-col">
        <div className="flex-1 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-4 py-2 text-sm font-medium rounded-md border ${
              currentStep === 1
                ? "border-slate-200 text-slate-400 cursor-not-allowed"
                : "border-slate-300 text-black hover:bg-slate-100"
            }`}
          >
            Previous
          </button>

          {currentStep === totalSteps ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 shadow-sm"
            >
              Submit PQQ
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              Next Step
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
