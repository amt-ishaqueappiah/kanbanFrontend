export interface ISubTask {
    subtaskid: string
    title: string;
    is_completed: boolean;
}

export interface ITask {
    taskid: string;
    title: string;
    description?: string;
    status?: string;
    subtasks?: ISubTask[];
}

export interface IColumn {
    columnid: string;
    name?: string;
    tasks?: ITask[];
}

export interface IBoard {
    boardid: string;
    name?: string;
    columns: IColumn[];
    
}

export interface IBoards {
    value: IBoard[];
}

