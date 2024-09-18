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

interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

interface PaginationLinks {
  first: string;
  previous: string | null;
  next: string | null;
  last: string;
}

export interface PaginationResponse<T> {
  meta: PaginationMeta;
  links: PaginationLinks;
  data: T[];
}
