import React from "react";
import { Check, Clock, Activity } from "lucide-react";

interface TaskSummaryProps {
  events: any[];
}

export const TaskSummary: React.FC<TaskSummaryProps> = ({ events }) => {
  const pendingTasks = events ? events.reduce((count, event) => {
    return count + (event.tasks ? event.tasks.filter(task => task.status === 'pending').length : 1);
  }, 0) : 0;
  
  const completedTasks = events ? events.reduce((count, event) => {
    return count + (event.tasks ? event.tasks.filter(task => task.status !== 'pending').length : 0);
  }, 0) : 0;
  
  const totalTasks = pendingTasks + completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8 border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Task Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mr-4">
              <Clock className="h-6 w-6 text-yellow-700 dark:text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending Tasks</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{pendingTasks}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-100 dark:border-green-900/30">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
              <Check className="h-6 w-6 text-green-700 dark:text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completed Tasks</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{completedTasks}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
              <Activity className="h-6 w-6 text-blue-700 dark:text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{completionRate}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 