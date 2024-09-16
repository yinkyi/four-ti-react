import { useMutation, useQuery } from "react-query";
import { getTasks, updateTask } from "../libs/fetcher";
import LoadingScreen from "./LoadingScreen";
import { queryClient } from "../utils/config";
import { TaskUpdatePayload } from "../libs/payload";
import Task from "../libs/responses";
import { useState } from "react";

interface addTaskProps {
  onAddTask: () => void;
}

const TaskList: React.FC<addTaskProps> = ({ onAddTask }) => {
  const [editedTitle, setEditedTitle] = useState<string | null>(null);
  const [isEditingId, setIsEditingId] = useState<string>("");

  const { isLoading, data } = useQuery(["tasks"], async () => {
    return await getTasks();
  });

  const updateMutate = useMutation(
    (data: TaskUpdatePayload) =>
      updateTask({
        ...data,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("tasks");

        onAddTask();
      },
    }
  );

  const completeTaskClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMutate.mutate({
      id: e.target.value,
      completed: e.target.checked,
    });
  };

  const handleSaveClick = (task: Task) => {
    if (editedTitle)
      updateMutate.mutate({
        id: task.id,
        title: editedTitle,
      });
    setIsEditingId("");
    setEditedTitle(null);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ul className="space-y-2">
          {data?.map((task: Task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg group"
            >
              <label className="flex items-center w-full space-x-3 ">
                <input
                  type="checkbox"
                  name={`task-${task.id}`}
                  value={task.id}
                  className="w-5 h-5 peer checkbox-input"
                  checked={task.completed ? true : false}
                  onChange={(e) => completeTaskClick(e)}
                />
                <div className="checkbox-custom">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                {!task.completed && isEditingId === task.id ? (
                  <input
                    type="text"
                    value={editedTitle === null ? task.title : editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="flex-grow px-2 py-1 text-black bg-gray-100 rounded-lg focus:outline-none"
                    placeholder="Enter task title"
                  />
                ) : (
                  <span className="peer-checked:line-through">
                    {task.title}
                  </span>
                )}
              </label>

              {isEditingId === task.id ? (
                <button
                  className="text-green-400 hover:text-green "
                  onClick={() => handleSaveClick(task)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M20.293 5.293a1 1 0 00-1.414 0L10 13.586 5.121 8.707a1 1 0 00-1.414 1.414l5.5 5.5a1 1 0 001.414 0l9-9a1 1 0 000-1.414z" />
                  </svg>
                </button>
              ) : (
                <button
                  className="text-gray-400 hover:text-white group-has-[:checked]:hidden"
                  onClick={() => setIsEditingId(task.id)}
                >
                  ✏️
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TaskList;
