"use client";

import { usePqqStore } from "../store/usePqqStore";

const ISO_CERTS = [
  "ISO 9001 (Quality Management)",
  "ISO 14001 (Environmental Management)",
  "ISO 45001 (Occupational Health and Safety)",
  "ISO 13485 (Medical Devices)",
  "ISO 27001 (Information Security)",
];

export function Step5Quality() {
  const { data, updateData } = usePqqStore();

  const toggleCert = (cert: string) => {
    if (data.isoCertifications.includes(cert)) {
      updateData({ isoCertifications: data.isoCertifications.filter((c) => c !== cert) });
    } else {
      updateData({ isoCertifications: [...data.isoCertifications, cert] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-black">Quality & Compliance</h2>
        <p className="mt-1 text-sm text-black">Select the certifications your company currently holds.</p>
      </div>

      <div className="space-y-3">
        {ISO_CERTS.map((cert) => {
          const isSelected = data.isoCertifications.includes(cert);
          return (
            <label
              key={cert}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                isSelected ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={isSelected}
                onChange={() => toggleCert(cert)}
              />
              <span className={`ml-3 text-sm font-medium ${isSelected ? "text-blue-900" : "text-black"}`}>
                {cert}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
