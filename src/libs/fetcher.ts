import store, { RootState } from "../store";
import TodoPayload from "./payload";

const api = import.meta.env.VITE_API_URL;

function getToken(): string | null {
  const state: RootState = store.getState();
  return state.auth.accessToken;
}

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
  const token = getToken();
  const res = await fetch(`${api}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    // Throw an error if the status is not in the 2xx range
    const errorData = await res.json();
    throw new Error(errorData.message || "Todo request failed");
  }

  // Parse the successful response
  const response = await res.json();
  return response.data;
}

export async function saveTask(data: TodoPayload) {
  const token = getToken();
  const res = await fetch(`${api}/todos`, {
    method: "POST",
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    // Throw an error if the status is not in the 2xx range
    const errorData = await res.json();
    throw new Error(errorData.message || "Todo request failed");
  }

  // Parse the successful response
  const response = await res.json();
  return response.data;
}
