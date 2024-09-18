import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import Toast from "../components/Toast";
import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { IinitialState } from "../utils/interface";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

const HomePage = () => {
  const user = useSelector((state: IinitialState) => state.auth.user);
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState<string>("");
  const onAddTaskHandler = (state: string) => {
    setShowToast(state);
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: `http://localhost:${import.meta.env.VITE_APP_PORT}`,
      },
    });
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
          <ArrowRightStartOnRectangleIcon
            className="cursor-pointer h-7 w-7"
            aria-hidden="true"
            onClick={handleLogout}
          />
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
