export interface ITag {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITagCreate {
  name: string;
  userId: string;
}

export interface ITagUpdate {
  name?: string;
}

export interface ITagResponse extends ITag {}
