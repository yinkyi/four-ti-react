import React, { useState } from "react";
import { useMutation } from "react-query";
import { saveTask } from "../libs/fetcher";
import { queryClient } from "../utils/config";
import { PlusIcon } from "@heroicons/react/24/outline";
interface addTaskProps {
  onAddTask: () => void;
}
const AddTask: React.FC<addTaskProps> = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState("");

  const saveMutate = useMutation(
    () =>
      saveTask({
        title: newTask,
      }),
    {
      onSuccess: async () => {
        await queryClient.refetchQueries("tasks");
        setNewTask("");
        onAddTask();
      },
    }
  );

  const addTask = () => {
    saveMutate.mutate();
  };

  return (
    <div className="flex mb-4">
      <input
        type="text"
        className="flex-1 px-4 py-2 text-black rounded-l-lg focus:outline-none"
        placeholder="Try typing 'Buy milk'"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        onClick={addTask}
        disabled={newTask === "" ? true : false}
        className={`px-4 py-2 text-white bg-blue-500 rounded-r-lg ${
          newTask === ""
            ? "bg-gray-400 cursor-not-allowed"
            : "hover:bg-blue-700"
        }  `}
      >
        <PlusIcon className="w-7 h-7" />
      </button>
    </div>
  );
};

export default AddTask;
