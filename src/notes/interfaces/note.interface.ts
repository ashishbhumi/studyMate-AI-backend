export interface INote {
  id: string;
  title: string;
  content?: string;
  coverImage?: string;
  isPinned: boolean;
  isArchived: boolean;
  folderId?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface INoteCreate {
  title: string;
  content?: string;
  coverImage?: string;
  isPinned?: boolean;
  isArchived?: boolean;
  folderId?: string;
  userId: string;
}

export interface INoteUpdate {
  title?: string;
  content?: string;
  coverImage?: string;
  isPinned?: boolean;
  isArchived?: boolean;
  folderId?: string;
}

export interface INoteResponse extends INote {}
