"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";

interface Task {
  name: string;
  start: number;
  duration: number;
}

export default function GanttChart() {
  const [tasks, setTasks] = useState<Task[]>([
    { name: 'Planning', start: 0, duration: 3 },
    { name: 'Design', start: 2, duration: 4 },
    { name: 'Development', start: 5, duration: 8 },
    { name: 'Testing', start: 12, duration: 3 },
    { name: 'Deployment', start: 14, duration: 2 },
  ]);

  const maxDay = Math.max(...tasks.map((t) => t.start + t.duration));

  const updateTask = (i: number, field: keyof Task, value: string | number) => {
    const newTasks = [...tasks];
    newTasks[i] = { ...newTasks[i], [field]: value };
    setTasks(newTasks);
  };

  const addTask = () => setTasks([...tasks, { name: 'New Task', start: 0, duration: 1 }]);
  const removeTask = (i: number) => setTasks(tasks.filter((_, idx) => idx !== i));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Gantt Chart & Timeline Maker</h1>
          <p className="text-sm text-muted-foreground">Generate project timelines from task lists</p>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {tasks.map((task, i) => (
          <div key={i} className="flex items-center gap-2">
            <input value={task.name} onChange={(e) => updateTask(i, 'name', e.target.value)} className="flex-1 rounded-md border px-3 py-1.5 text-sm" />
            <input type="number" value={task.start} onChange={(e) => updateTask(i, 'start', Number(e.target.value))} className="w-20 rounded-md border px-3 py-1.5 text-sm" placeholder="Start" />
            <input type="number" value={task.duration} onChange={(e) => updateTask(i, 'duration', Number(e.target.value))} className="w-20 rounded-md border px-3 py-1.5 text-sm" placeholder="Days" />
            <button onClick={() => removeTask(i)} className="text-destructive text-sm px-2">×</button>
          </div>
        ))}
        <button onClick={addTask} className="text-sm text-primary hover:underline">+ Add Task</button>
      </div>

      <div className="rounded-lg border bg-card p-4 overflow-x-auto">
        <div className="flex mb-2 text-xs text-muted-foreground">
          <div className="w-32 shrink-0">Task</div>
          <div className="flex">
            {Array.from({ length: maxDay + 1 }, (_, i) => (
              <div key={i} className="w-8 text-center">{i}</div>
            ))}
          </div>
        </div>
        {tasks.map((task, i) => (
          <div key={i} className="flex items-center mb-2">
            <div className="w-32 shrink-0 text-sm font-medium truncate">{task.name}</div>
            <div className="flex relative h-6">
              {Array.from({ length: task.start }, (_, j) => (
                <div key={j} className="w-8 shrink-0" />
              ))}
              <div
                className="h-6 rounded bg-primary flex items-center justify-center text-xs text-primary-foreground px-1"
                style={{ width: `${task.duration * 32}px` }}
              >
                {task.duration}d
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
