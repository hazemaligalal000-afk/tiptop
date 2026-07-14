"use client";

import { usePqqStore } from "../store/usePqqStore";

export function Step2Organisation() {
  const { data, updateData } = usePqqStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-black">Organisation & Resources</h2>
        <p className="mt-1 text-sm text-black">Provide details about your workforce.</p>
      </div>

      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        <div>
          <label htmlFor="employeeCount" className="block text-sm font-medium text-black">
            Total Employee Count
          </label>
          <div className="mt-1">
            <input
              type="number"
              id="employeeCount"
              min="1"
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border outline-none"
              value={data.employeeCount}
              onChange={(e) => updateData({ employeeCount: parseInt(e.target.value) || '' })}
              placeholder="e.g. 150"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
