import type { DivUiComponent } from "../_shared/system.types";
import type { TOAST_STATUSES, TOAST_TYPES } from "./Toast.constants";

export type ToastStatuses = typeof TOAST_STATUSES[number];
export type ToastTypes = typeof TOAST_TYPES[number];

export interface ToastVars extends React.CSSProperties { '--toast-status-color': string }

interface BaseToastData extends Omit<DivUiComponent, 'id'> {
    id: string;
    label: string;
    text?: string;
    status: ToastStatuses;

    onClose?: () => void;
    onClick?: () => void;
}
// #region DialogTypes
export interface DialogBaseData {
    confirmLabel: string;
    denyLabel: string;
}

export interface OnlyConfirmDialogToastData {
    type: 'dialog';
    onConfirm: () => void;
    onDeny?: () => void;
}

export interface OnlyDenyDialogToastData {
    type: 'dialog';
    onConfirm?: () => void;
    onDeny: () => void;
}

export interface BothActionsDialogToastData {
    type: 'dialog';
    onConfirm: () => void;
    onDeny: () => void;
}

export interface NonDialogToastData {
    type: Exclude<ToastTypes, 'dialog'>;
    confirmLabel?: never;
    denyLabel?: never;
    onConfirm?: never;
    onDeny?: never;
}

export type DialogActions = DialogBaseData & (OnlyConfirmDialogToastData | OnlyDenyDialogToastData | BothActionsDialogToastData);
// #endregion

export type ToastData = BaseToastData & (NonDialogToastData | DialogActions);

export interface ToastStore {
    toastList: ToastData[];
    pushToast: (data: ToastData) => void;
    deleteToast: (data: ToastData) => void;
}