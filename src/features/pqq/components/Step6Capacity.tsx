"use client";

import { usePqqStore } from "../store/usePqqStore";

export function Step6Capacity() {
  const { data, updateData } = usePqqStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-black">Capacity & Availability</h2>
        <p className="mt-1 text-sm text-black">Provide an estimate of your current workload.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="workload" className="block text-sm font-medium text-black">
            Current Workload Capacity
          </label>
          <div className="mt-1">
            <select
              id="workload"
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border outline-none bg-white"
              value={data.currentWorkload}
              onChange={(e) => updateData({ currentWorkload: e.target.value })}
            >
              <option value="">Select current capacity</option>
              <option value="0-25">0-25% (High Availability)</option>
              <option value="26-50">26-50% (Moderate Availability)</option>
              <option value="51-75">51-75% (Low Availability)</option>
              <option value="76-100">76-100% (At Capacity)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
