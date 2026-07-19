import type { TOAST_STATUSES, TOAST_TYPES } from "./Toast.constants";

export type ToastStatuses = typeof TOAST_STATUSES[number];
export type ToastTypes = typeof TOAST_TYPES[number];

export interface ToastVars extends React.CSSProperties { '--toast-status-color': string }
export interface ToastData {
    id: number;
    label: string;
    text?: string;
    status: ToastStatuses;
    type?: ToastTypes;
}

export interface ToastStore {
    toastList: ToastData[];
    pushToast: (data: ToastData) => void;
    closeToast: (id: number) => void;
}