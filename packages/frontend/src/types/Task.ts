export default interface Task {
    id: string;
    title: string;
    description: string;
    deadline: Date;
    notifyAt: Date;
    status: "completed" | "pending" | "overdue" | "scheduled" | 'in_progress';
    createdAt: Date;
    updatedAt: Date;
}
