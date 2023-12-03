export const enum DefaultFoldersIds {
  allNotesFolderId,
  starredFolderId,
  archiveFolderId,
  trashFolderId,
  sharedFolderId
}

export const appConstants = {
  DEFAULT_LOCAL_STORAGE_KEY: 'openpress',
  EDITOR_PLACEHOLDER: 'Let`s write an awesome story!',
  DEFAULT_FOLDERS: [
    {
      id: DefaultFoldersIds.allNotesFolderId,
      name: 'All notes',
      icon: 'description',
      background: 'background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);',
      isDefault: true,
      notes: []
    },
    {
      id: DefaultFoldersIds.starredFolderId,
      name: 'Starred',
      icon: 'editor_choice',
      background: 'background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);',
      isDefault: true,
      notes: []
    },
    {
      id: DefaultFoldersIds.archiveFolderId,
      name: 'Archived',
      icon: 'archive',
      background: 'background-image: linear-gradient(to top, #9890e3 0%, #b1f4cf 100%);',
      isDefault: true,
      notes: []
    },
    {
      id: DefaultFoldersIds.trashFolderId,
      name: 'Trash',
      icon: 'recycling',
      background:
        'background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);',
      isDefault: true,
      notes: []
    },
    {
      id: DefaultFoldersIds.sharedFolderId,
      name: 'Shared',
      icon: 'folder_shared',
      background: 'background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);',
      isDefault: true,
      notes: []
    }
  ]
}
