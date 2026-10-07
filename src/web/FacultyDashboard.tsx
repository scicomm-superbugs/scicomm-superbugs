import React, { useState } from 'react';

export interface StudentProgress {
  id: string;
  name: string;
  program: 'Molecular Biotechnology' | 'Biochemistry' | 'Microbiology';
  gpa: number;
  fieldTrainingHours: number;
  labCompetenciesPassed: number;
}

export const FacultyAnalyticsDashboard: React.FC = () => {
  const [filter, setFilter] = useState<string>('ALL');

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AIU Faculty of Science</h2>
          <p className="text-slate-400 text-sm">Academic Performance & Field Training Analytics</p>
        </div>
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
          Department Coordinator Portal
        </span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <p className="text-slate-400 text-xs">Total Supervised Courses</p>
          <h3 className="text-3xl font-bold mt-1 text-sky-400">14</h3>
        </div>
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <p className="text-slate-400 text-xs">Field Training Delegates</p>
          <h3 className="text-3xl font-bold mt-1 text-emerald-400">2,000+</h3>
        </div>
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <p className="text-slate-400 text-xs">SciComm Spark Media Reach</p>
          <h3 className="text-3xl font-bold mt-1 text-amber-400">15 Outlets</h3>
        </div>
      </div>
    </div>
  );
};
