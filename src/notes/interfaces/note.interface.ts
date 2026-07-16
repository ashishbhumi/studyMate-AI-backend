export interface INote {
  id: number;
  title: string;
  content?: string;
  coverImage?: string;
  isPinned: boolean;
  isArchived: boolean;
  folderId?: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface INoteCreate {
  title: string;
  content?: string;
  coverImage?: string;
  isPinned?: boolean;
  isArchived?: boolean;
  folderId?: number;
  userId: number;
}

export interface INoteUpdate {
  title?: string;
  content?: string;
  coverImage?: string;
  isPinned?: boolean;
  isArchived?: boolean;
  folderId?: number;
}

export interface INoteResponse extends INote {}
