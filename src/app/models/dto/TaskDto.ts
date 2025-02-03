export type TaskDto = {
    id: string,
    title: string,
    description: string,
    dueDate: Date,
    createdAt: Date,
    completed: boolean,
    important: boolean,
    categoryId: string
}