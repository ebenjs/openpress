interface Note {
  id: number
  title: string
  description: string
  body: string
  createdAt: string
}

interface Folder {
  id: number
  name: string
  icon: string
  background?: string
  notes: Note[]
}
