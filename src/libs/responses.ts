interface User {
  id: string;
  name: string;
  email: string;
}

export default interface Task {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
}
