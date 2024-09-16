interface User {
  id: string;
  name: string;
  email: string;
}

export default interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}
