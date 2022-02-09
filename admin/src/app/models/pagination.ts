export interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  result!: T[];
  pageNumber!: number;
  pageSize!: number;
}
