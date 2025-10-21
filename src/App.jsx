import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import * as api from './services/api';
import Footer from './components/Footer';
import { DragDropContext } from 'react-beautiful-dnd';

/*
 Dashboard-style layout:
 - Left: Sidebar
 - Right: main content with header, controls, dashboard cards and task area
*/
export default function App(){
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('tasks');

  useEffect(()=>{ load(); }, []);

  async function load(){
    try {
      const res = await api.fetchTasks();
      // sort by 'order' if present so DnD order persists
      const sorted = res.data.slice().sort((a,b)=> (a.order||0)-(b.order||0));
      setTasks(sorted);
    } catch (e) {
      console.error('Failed to load tasks', e);
    }
  }

  async function handleCreate(payload){
    await api.createTask(payload);
    await load();
  }

  async function handleToggle(task){
    await api.updateTask(task.id, {...task, completed: !task.completed});
    await load();
  }

  async function handleDelete(id){
    if (!confirm('Delete task?')) return;
    await api.deleteTask(id);
    await load();
  }

  async function onDragEnd(result){
    if (!result.destination) return;
    const src = result.source.index;
    const dest = result.destination.index;
    if (src === dest) return;
    const items = Array.from(tasks);
    const [moved] = items.splice(src, 1);
    items.splice(dest, 0, moved);
    try {
      for (let i=0;i<items.length;i++){
        const t = {...items[i], order: i};
        // persist sequentially to keep DB consistent
        // eslint-disable-next-line no-await-in-loop
        await api.updateTask(t.id, t);
      }
      setTasks(items);
    } catch(e){ console.error('Failed to persist order', e); }
  }

  const filtered = tasks.filter(t=>{
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    if (query) return (t.title||'').toLowerCase().includes(query.toLowerCase());
    return true;
  });

  const completedCount = tasks.filter(t=>t.completed).length;

  return (
   <>
    <div className="app-shell">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Sidebar active={active} setActive={setActive} />
        </div>
        <div className="col-span-9 space-y-6">
          <div className="glass p-6 rounded-2xl">
            <Header title="Unique To-Do Dashboard">
              <div className="flex items-center gap-4">
                <div className="text-sm text-slate-300">Completed: {completedCount}/{tasks.length}</div>
              </div>
            </Header>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <Dashboard tasks={tasks} />
            </div>
            <div>
              <div className="glass p-6 rounded-2xl">
                <h4 className="font-semibold">Quick Actions</h4>
                <p className="text-xs text-slate-400">Filters & search</p>
                <div className="mt-4">
                  <input placeholder='Search title...' value={query} onChange={e=>setQuery(e.target.value)} className="w-full p-3 rounded-lg bg-transparent border border-white/6" />
                  <div className="mt-3"><TaskFilter filter={filter} setFilter={setFilter} /></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl">
            <TaskForm onCreate={handleCreate} />
            <div className="mt-4">
              <DragDropContext onDragEnd={onDragEnd}>
                <TaskList tasks={filtered} onToggle={handleToggle} onDelete={handleDelete} />
              </DragDropContext>
            </div>
          </div>

        </div>
      </div>
    </div>
    <Footer />
   </>
  );
}
