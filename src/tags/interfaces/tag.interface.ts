export interface ITag {
  id: number;
  name: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITagCreate {
  name: string;
  userId: number;
}

export interface ITagUpdate {
  name?: string;
}

export interface ITagResponse extends ITag {}
