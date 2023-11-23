interface Note {
  id: number | string
  title: string
  description: string
  body: string
  createdAt: string
  isRead?: boolean
}

interface Folder {
  id: number
  name: string
  icon?: string
  background?: string
  notes: Note[]
}

interface FilterOptions {
  read: boolean
  unread: boolean
}
