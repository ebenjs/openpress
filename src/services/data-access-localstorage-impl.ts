import type { DataAccess } from './data-access'

export class DataAccessLocalStorageImpl implements DataAccess {
  public async get<T>(path: string): Promise<T> {
    const folders = localStorage.getItem(path)

    if (!folders) {
      return Promise.reject(new Error('No data found'))
    }

    try {
      return Promise.resolve(JSON.parse(folders))
    } catch (e) {
      return Promise.reject(e)
    }
  }
  post<T>(url: string, data: any): Promise<T> {
    try {
      localStorage.setItem(url, JSON.stringify(data))
      return Promise.resolve(data)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
