import { PqqWizard } from "@/features/pqq/components/PqqWizard";

export default function PqqWizardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-bold text-black">Vendor Prequalification Questionnaire</h1>
          <p className="mt-2 text-black">Complete your profile to increase your Vendor Quality Index (VQI).</p>
        </div>
        
        <PqqWizard />
      </div>
    </div>
  );
}
