export type TodoStatus = "open" | "close";

export interface Todo {
    id: number;
    title: string;
    description?: string;
    status: TodoStatus;
    due_date?: string | null;
    created_at: string;
    updated_at?: string;
}