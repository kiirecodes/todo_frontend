import React from 'react';
export default function TaskFilter({filter, setFilter}) {
  return (
    <div className='flex gap-2'>
      <button onClick={()=>setFilter('all')} className='px-3 py-2 rounded-md glass text-sm'>All</button>
      <button onClick={()=>setFilter('pending')} className='px-3 py-2 rounded-md glass text-sm'>Pending</button>
      <button onClick={()=>setFilter('completed')} className='px-3 py-2 rounded-md glass text-sm'>Completed</button>
    </div>
  );
}
