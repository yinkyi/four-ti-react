import { useState } from "react";
import AddTask from "../components/AddTask";
import TaskList from "../components/taskList";

const HomePage = () => {
  const onAddTaskHandler = () => {};

  return (
    <div className="flex flex-col items-center justify-center h-screen m-auto text-white bg-gray-900">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg sm:w-[500px] md:w-[800px] lg:w-[1000px] mx-auto">
        <h1 className="mb-4 text-xl text-center">📝 My tasks</h1>

        {/* Add Task Input */}
        <AddTask onAddTask={() => onAddTaskHandler()} />

        {/* Task List */}
        <TaskList />
      </div>
    </div>
  );
};

export default HomePage;
