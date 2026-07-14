import { create } from 'zustand';

export type PqqData = {
  // Step 1: Company Info
  companyName: string;
  website: string;
  country: string;
  regions: string[];
  yearsOperating: number | '';
  description: string;
  
  // Step 2: Organisation
  employeeCount: number | '';
  
  // Step 3: Technical Capabilities (Simplified for now)
  capabilities: string[];
  
  // Step 4: Project Experience
  projects: Array<{
    projectName: string;
    industry: string;
    value: string;
    gmpExperience: boolean;
  }>;
  
  // Step 5: Quality Compliance
  isoCertifications: string[];
  
  // Step 6: Capacity
  currentWorkload: string;
};

interface PqqStore {
  currentStep: number;
  totalSteps: number;
  data: PqqData;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (partialData: Partial<PqqData>) => void;
}

const defaultData: PqqData = {
  companyName: '',
  website: '',
  country: '',
  regions: [],
  yearsOperating: '',
  description: '',
  employeeCount: '',
  capabilities: [],
  projects: [],
  isoCertifications: [],
  currentWorkload: '',
};

export const usePqqStore = create<PqqStore>((set) => ({
  currentStep: 1,
  totalSteps: 7, // 1-6 are forms, 7 is review
  data: defaultData,
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, state.totalSteps) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  updateData: (partialData) => set((state) => ({ data: { ...state.data, ...partialData } })),
}));
