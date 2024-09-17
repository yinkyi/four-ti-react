import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import Toast from "../components/Toast";
import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { IinitialState } from "../utils/interface";

const HomePage = () => {
  const user = useSelector((state: IinitialState) => state.auth.user);
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
          <h1 className="flex-grow text-center tl ext-xl">
            📝 {user?.name}'s Tasks{" "}
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="text-blue-500 cursor-pointer size-6"
            onClick={handleLogout}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </div>

        {/* Add Task Input */}
        <AddTask onAddTask={() => onAddTaskHandler("save")} />
        <div className="flex flex-col justify-between mb-4 tems-center">
          <h1 className="text-center tl ext-xl">To do</h1>
          {/* Task List */}
          <TaskList onAddTask={() => onAddTaskHandler("update")} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
