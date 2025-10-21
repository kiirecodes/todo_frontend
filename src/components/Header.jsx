import React from 'react';
export default function Header({title, children}) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-extrabold">{title}</h1>
        <p className="text-sm text-slate-400">A modern to-do app designed for job submissions</p>
      </div>
      <div>{children}</div>
    </header>
  );
}
