import type { OutputData } from '@editorjs/editorjs'

interface Note {
  id: number | string
  data: OutputData
  createdAt: string
  isRead?: boolean
}

interface EditorOutputFormat {
  time: number
  blocks: []
  version: string
}

interface Folder {
  id: number | string
  name: string
  icon?: string
  background?: string
  isDefault?: boolean
  notes: Note[]
}

interface FilterOptions {
  read: boolean
  unread: boolean
}
