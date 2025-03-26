export interface BlogPost {
  id: number;
  title: string;
  body: string;
  author: string;
  excerpt?: string;
  userId?: number;
  isLocal?: boolean;
}

export interface NewBlogPost {
  title: string;
  body: string;
  author: string;
}

export interface ApiError {
  status: number;
  data: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  totalPages: number;
}