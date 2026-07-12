export interface IFolder {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFolderCreate {
  name: string;
  userId: string;
}

export interface IFolderUpdate {
  name?: string;
}

export interface IFolderResponse extends IFolder {}
