import React from 'react';
import classNames from 'classnames';
export default function Sidebar({active, setActive}) {
  const items = [
    {id:'tasks', label:'Tasks'},
    {id:'dashboard', label:'Dashboard'},
    {id:'settings', label:'Settings'},
  ];
  return (
    <aside className="w-64 p-4 glass rounded-xl h-[80vh]">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Kiire's To-Do</h3>
        <div className="text-xs text-slate-400">Productive · Clean · Modern</div>
      </div>
      <nav className="flex flex-col gap-2">
        {items.map(i => (
          <button key={i.id}
            onClick={()=>setActive(i.id)}
            className={classNames('text-left p-3 rounded-md transition', {
              'bg-indigo-600/20 text-indigo-300': active===i.id,
              'hover:bg-white/2': active!==i.id
            })}
          >
            {i.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
