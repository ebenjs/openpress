export interface DataAccess {
  get<T>(url: string): Promise<T>
  post<T>(url: string, data: T): Promise<T>
}
