export interface Pagination {
  pageNumber: any;
  pageSize: any;
  totalItems: any;
  totalPages: any;
}

export class PaginatedResult<T> {
  result!: T[];
  pageNumber: any;
  pageSize: any;
}
