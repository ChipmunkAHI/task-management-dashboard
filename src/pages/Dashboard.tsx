import { useGetTasksQuery } from '../services/taskApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import AddTaskForm from "../features/tasks/AddTaskForm";
import { useState } from 'react';
import EditTaskForm from "../features/tasks/EditTaskForm";
import { useDeleteTaskMutation } from '../services/taskApi';
import { useDispatch } from 'react-redux';
import { deleteLocalTask } from '../features/tasks/localTasksSlice';

const Dashboard = () => {
  const { data, error, isLoading } = useGetTasksQuery(5); 
  const user = useSelector((state: RootState) => state.auth.user);
  const localTasks = useSelector((state: RootState) => state.localTasks);
  const allTasks = [...(data?.todos || []), ...localTasks];
  const dispatch = useDispatch();

  const [deleteTask] = useDeleteTaskMutation();

  const [editingTask, setEditingTask] = useState(null);

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks</p>;

  const userTasks = allTasks?.filter((task: any) => task.userId === user?.id); 

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <AddTaskForm />
      <p>Tasks loaded: {userTasks?.length}</p>

        {editingTask && (
      <EditTaskForm task={editingTask} onClose={() => setEditingTask(null)} />
        )}

      <div className="space-y-2 mt-4">
        {userTasks?.map((task: any) => (
          <div key={task.id} className="p-3 border rounded bg-white shadow">
            <h2 className="font-semibold">{task.todo}</h2>
            <p>Status: {task.completed ? "Done" : "Pending"}</p>
            <p>User ID: {task.userId}</p>

                <button
      onClick={() => setEditingTask(task)}
      className="bg-yellow-500 text-white px-3 py-1 rounded mt-2 hover:bg-yellow-600"
    >
      Edit
    </button>

    <button
        onClick={() => {
        if (confirm("Are you sure you want to delete this task?")) {
        if (task.id > 1000) {
      // Local task
      dispatch(deleteLocalTask(task.id));
      deleteTask(task.id);
     } else {
      // Server task
      deleteTask(task.id);
      dispatch(deleteLocalTask(task.id));
        }
        }
        }}
        className="bg-red-500 text-white px-3 py-1 rounded mt-2 ml-2 hover:bg-red-600">
        Delete
    </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;