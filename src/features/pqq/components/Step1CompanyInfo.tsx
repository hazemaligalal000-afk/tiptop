"use client";

import { usePqqStore } from "../store/usePqqStore";

export function Step1CompanyInfo() {
  const { data, updateData } = usePqqStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-black">Company Information</h2>
        <p className="mt-1 text-sm text-black">Provide basic details about your company.</p>
      </div>

      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        <div className="sm:col-span-2">
          <label htmlFor="companyName" className="block text-sm font-medium text-black">
            Legal Company Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="companyName"
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border outline-none"
              value={data.companyName}
              onChange={(e) => updateData({ companyName: e.target.value })}
              placeholder="Acme Corp"
            />
          </div>
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-black">
            Website URL
          </label>
          <div className="mt-1">
            <input
              type="url"
              id="website"
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border outline-none"
              value={data.website}
              onChange={(e) => updateData({ website: e.target.value })}
              placeholder="https://acme.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-black">
            HQ Country
          </label>
          <div className="mt-1">
            <select
              id="country"
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border outline-none bg-white"
              value={data.country}
              onChange={(e) => updateData({ country: e.target.value })}
            >
              <option value="">Select a country</option>
              <option value="CH">Switzerland</option>
              <option value="DE">Germany</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="years" className="block text-sm font-medium text-black">
            Years Operating
          </label>
          <div className="mt-1">
            <input
              type="number"
              id="years"
              min="0"
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border outline-none"
              value={data.yearsOperating}
              onChange={(e) => updateData({ yearsOperating: parseInt(e.target.value) || '' })}
              placeholder="e.g. 15"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-black">
            Company Description
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              rows={4}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border outline-none"
              value={data.description}
              onChange={(e) => updateData({ description: e.target.value })}
              placeholder="Briefly describe your services..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
