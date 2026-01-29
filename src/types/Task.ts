export default interface Task {
    id: string;
    title: string;
    description: string;
    deadline: Date;
    notifyAt: Date;
    status: "completed" | "pending" | "outdated";
    createdAt: Date;
    updatedAt: Date;
}