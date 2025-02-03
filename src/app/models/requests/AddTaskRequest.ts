export type AddTaskRequest = {
    title: string,
    description: string,
    categoryId: string,
    dueDate: Date,
    important: boolean,
}