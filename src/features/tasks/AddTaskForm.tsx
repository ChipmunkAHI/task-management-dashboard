import { useForm } from "react-hook-form";
import { useAddTaskMutation } from "../../services/taskApi";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { addLocalTask } from "../../features/tasks/localTasksSlice";

const AddTaskForm = () => {
  const dispatch = useDispatch<AppDispatch>(); 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [addTask, { isLoading }] = useAddTaskMutation();
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return null;

  const onSubmit = async (data: any) => {
    const taskData = {
      todo: data.title,
      completed: false,
      userId: user.id,
    };
    try {
      const result = await addTask(taskData).unwrap();
      dispatch(addLocalTask(result));
      reset();
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
      <div>
        <label className="block font-medium">Task Title</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          {...register("title", { required: "Task title is required" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">
            {errors.title?.message && String(errors.title.message)}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isLoading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default AddTaskForm;