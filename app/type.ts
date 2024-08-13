export interface Todo {
    id: number;
    title: string;
    description: string;
    created_by: number;
    created_at: Date;
    updated_at: Date;
}

export interface Item {
    id: number;
    name: string;
    done: boolean;
    todo_id: number;
    created_at: Date;
    updated_at: Date;
    progress_percentage: number;
}