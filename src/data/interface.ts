export interface Subtask {
    title: string;
    isCompleted: boolean;
}

export interface Tasks {
    title: string;
    description: string;
    status: string;
    subtasks: Subtask[];
}

export interface Columns {
    name: string;
    tasks: Tasks[];
}

export interface Board {
    name: string;
    columns: Columns[];
}

// export interface Boards {
//     boards: Board[];
// }
