import { useForm } from "react-hook-form";
import { useUpdateTaskMutation } from "../../services/taskApi";

const EditTaskForm = ({ task, onClose }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: task.todo,
      completed: task.completed,
    },
  });

  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  const onSubmit = async (data: any) => {
    try {
      await updateTask({ id: task.id, todo: data.title, completed: data.completed }).unwrap();
      onClose();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6 bg-yellow-50 p-4 rounded">
      <h2 className="text-lg font-semibold">Edit Task</h2>

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

      <div>
        <label className="block font-medium">Completed</label>
        <input type="checkbox" {...register("completed")} />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;