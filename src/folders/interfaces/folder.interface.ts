export interface IFolder {
  id: number;
  name: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFolderCreate {
  name: string;
  userId: number;
}

export interface IFolderUpdate {
  name?: string;
}

export interface IFolderResponse extends IFolder {}
