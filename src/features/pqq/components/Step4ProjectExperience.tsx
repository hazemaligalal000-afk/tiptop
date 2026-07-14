"use client";

import { usePqqStore } from "../store/usePqqStore";
import { Plus, Trash2 } from "lucide-react";

export function Step4ProjectExperience() {
  const { data, updateData } = usePqqStore();

  const addProject = () => {
    updateData({
      projects: [
        ...data.projects,
        { projectName: "", industry: "", value: "", gmpExperience: false },
      ],
    });
  };

  const removeProject = (index: number) => {
    const newProjects = [...data.projects];
    newProjects.splice(index, 1);
    updateData({ projects: newProjects });
  };

  const updateProject = (index: number, field: string, value: string | boolean) => {
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    updateData({ projects: newProjects });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-black">Project Experience</h2>
          <p className="mt-1 text-sm text-black">List your most relevant recent projects.</p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Project
        </button>
      </div>

      {data.projects.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-lg">
          <p className="text-sm text-black">No projects added yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.projects.map((project, index) => (
            <div key={index} className="p-5 border border-slate-200 rounded-lg bg-slate-50 relative">
              <button
                onClick={() => removeProject(index)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              
              <h3 className="text-sm font-medium text-black mb-4">Project #{index + 1}</h3>
              
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-black">Project Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border outline-none bg-white"
                    value={project.projectName}
                    onChange={(e) => updateProject(index, "projectName", e.target.value)}
                    placeholder="e.g. BioTech Facility Expansion"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Industry</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border outline-none bg-white"
                    value={project.industry}
                    onChange={(e) => updateProject(index, "industry", e.target.value)}
                    placeholder="e.g. Pharmaceuticals"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Approx. Value</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border outline-none bg-white"
                    value={project.value}
                    onChange={(e) => updateProject(index, "value", e.target.value)}
                    placeholder="e.g. $5M - $10M"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center mt-2">
                  <input
                    type="checkbox"
                    id={`gmp-${index}`}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    checked={project.gmpExperience}
                    onChange={(e) => updateProject(index, "gmpExperience", e.target.checked)}
                  />
                  <label htmlFor={`gmp-${index}`} className="ml-2 block text-sm text-black cursor-pointer">
                    This project required GMP (Good Manufacturing Practice) compliance
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
