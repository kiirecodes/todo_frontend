import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';

export default function TaskList({tasks, onToggle, onDelete}) {
  if (!tasks.length) return <div className='text-slate-400'>No tasks found</div>;
  return (
    <Droppable droppableId="task-list">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-3">
          {tasks.map((t, index) => (
            <Draggable draggableId={String(t.id)} index={index} key={t.id}>
              {(prov) => (
                <motion.div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}
                  initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} exit={{opacity:0, y:6}}
                  className={'flex items-center justify-between p-4 rounded-lg glass'}>
                  <div className="flex items-center gap-4">
                    <input type='checkbox' checked={t.completed} onChange={()=>onToggle(t)} />
                    <div>
                      <div className="font-semibold">{t.title}</div>
                      <div className="text-xs text-slate-400">{t.priority} {t.due_date ? '· due '+t.due_date : ''}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={()=>onDelete(t.id)} className="text-sm text-rose-400 hover:underline">Delete</button>
                  </div>
                </motion.div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
