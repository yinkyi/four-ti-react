import { TaskPayload, TaskUpdatePayload } from "./payload";
import { client } from "./PrivateAPI";
const api = import.meta.env.VITE_API_URL;

export async function saveUserInfo(idToken: string) {
  const res = await fetch(`${api}/users`, {
    method: "POST",
    body: JSON.stringify({ idToken }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();
  return response.data;
}

export async function getTasks() {
  try {
    const res = await client.get(`/tasks`);
    return res.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
}

export async function saveTask(data: TaskPayload) {
  try {
    const res = await client.post("/tasks", data);
    return res.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || "Task request failed");
  }
}

export async function updateTask(data: TaskUpdatePayload) {
  try {
    const res = await client.patch(`/tasks/${data.id}`, data);
    return res.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || "Task request failed");
  }
}
