export default interface Task {
    id: string;
    title: string;
    description: string;
    deadline: Date;
    notifyAt: Date;
    status: "ready" | "pending" | "outdated";
    createdAt: Date;
    updatedAt: Date;
}