import React from 'react';
import { motion } from 'framer-motion';

/* Simple dashboard card to show task stats.
   Uses framer-motion for subtle entrance animation.
*/
export default function Dashboard({tasks}) {
  const total = tasks.length;
  const completed = tasks.filter(t=>t.completed).length;
  const pct = total ? Math.round((completed/total)*100) : 0;
  return (
    <motion.div initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} className="glass p-6 rounded-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-semibold">Overview</h4>
          <p className="text-sm text-slate-400">Quick glance at your productivity</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{completed}</div>
            <div className="text-xs text-slate-400">Completed</div>
          </div>
          <div className="w-16 h-16 relative">
            <svg viewBox="0 0 36 36" className="w-16 h-16">
              <path d="M18 2a16 16 0 1 0 0 32 16 16 0 0 0 0-32" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3"/>
              <path d="M18 2a16 16 0 1 0 0 32 16 16 0 0 0 0-32" fill="none"
                stroke="var(--accent)" strokeWidth="3"
                strokeDasharray={`${pct} ${100-pct}`} strokeDashoffset="25" strokeLinecap="round"/>
            </svg>
            <div className="absolute inset-0 grid place-items-center text-sm">{pct}%</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
