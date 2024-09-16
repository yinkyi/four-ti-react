import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import Toast from "../components/Toast";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState<string>("");
  const onAddTaskHandler = (state: string) => {
    setShowToast(state);
  };

  const handleLogout = () => {
    logout({});
    dispatch(authActions.logout());
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen m-auto text-white bg-gray-900">
      {showToast && (
        <Toast message={showToast} onClose={() => setShowToast("")} />
      )}
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg sm:w-[500px] md:w-[800px] lg:w-[1000px] mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="flex-grow text-center tl ext-xl">📝 My tasks</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Add Task Input */}
        <AddTask onAddTask={() => onAddTaskHandler("save")} />

        {/* Task List */}
        <TaskList onAddTask={() => onAddTaskHandler("update")} />
      </div>
    </div>
  );
};

export default HomePage;
