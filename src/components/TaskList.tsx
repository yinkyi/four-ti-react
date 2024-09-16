import { useQuery } from "react-query";
import { getTasks } from "../libs/fetcher";
import LoadingScreen from "./LoadingScreen";
import Todo from "../libs/responses";

const TaskList: React.FC = () => {
  const { isLoading, data } = useQuery(["tasks"], async () => {
    return await getTasks();
  });

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ul className="space-y-2">
          {data?.map((task: Todo) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
            >
              <label className="flex items-center space-x-2">
                <input type="radio" name="task" value={task.id} />
                <span className="radio-custom"></span>
                <span>{task.title}</span>
              </label>
              <button className="text-gray-400 hover:text-white">✏️</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TaskList;
