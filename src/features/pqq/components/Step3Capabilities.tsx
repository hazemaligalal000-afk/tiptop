"use client";

import { usePqqStore } from "../store/usePqqStore";

const CAPABILITY_OPTIONS = [
  "CSA (Civil, Structural, Architectural)",
  "HVAC",
  "Mechanical Piping",
  "Electrical",
  "Automation & Controls",
  "Cleanroom Construction",
  "Process Equipment",
];

export function Step3Capabilities() {
  const { data, updateData } = usePqqStore();

  const toggleCapability = (cap: string) => {
    if (data.capabilities.includes(cap)) {
      updateData({ capabilities: data.capabilities.filter((c) => c !== cap) });
    } else {
      updateData({ capabilities: [...data.capabilities, cap] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-black">Technical Capabilities</h2>
        <p className="mt-1 text-sm text-black">Select your core disciplines and capabilities.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CAPABILITY_OPTIONS.map((cap) => {
          const isSelected = data.capabilities.includes(cap);
          return (
            <div
              key={cap}
              onClick={() => toggleCapability(cap)}
              className={`cursor-pointer rounded-lg border p-4 flex items-center space-x-3 transition-colors ${
                isSelected ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center ${
                  isSelected ? "bg-blue-600 border-blue-600" : "border-slate-300"
                }`}
              >
                {isSelected && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`text-sm font-medium ${isSelected ? "text-blue-900" : "text-black"}`}>
                {cap}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
