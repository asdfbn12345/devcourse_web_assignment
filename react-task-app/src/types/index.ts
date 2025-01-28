export interface ITask {
  id: string;
  name: string;
  description: string;
  owner: string;
}

export interface IList {
  id: string;
  name: string;
  tasks: ITask[];
}

export interface IBoard {
  lists: IList[];
}

export interface ILogItem {
  id: string;
  author: string;
  message: string;
  timestamp: Date;
}
