export interface TaskPayload {
  title: string;
  content?: string;
}

export interface TaskUpdatePayload {
  id: string;
  completed?: boolean;
  title?: string;
}
