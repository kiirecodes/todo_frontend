import React, {useState} from 'react';
import { motion } from 'framer-motion';

export default function TaskForm({onCreate}) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');

  const submit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed.length < 2) return alert('Title too short');
    onCreate({title: trimmed, priority});
    setTitle('');
    setPriority('Medium');
  };

  return (
    <form onSubmit={submit} className="glass p-4 rounded-lg flex gap-3 items-center">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder='Add a task...' className="flex-1 p-3 rounded-lg bg-transparent border border-white/6 outline-none text-slate-100" />
      <select value={priority} onChange={e=>setPriority(e.target.value)} className="p-3 rounded-lg bg-transparent border border-white/6">
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
      <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.98}} className="bg-indigo-600 px-4 py-2 rounded-lg text-white">Add</motion.button>
    </form>
  );
}
