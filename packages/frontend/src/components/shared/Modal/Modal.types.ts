import type { DivUiRefComponent } from "@/components/entities/_shared/system.types";

export interface ModalProps extends DivUiRefComponent {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    hasBackground?: boolean;
};

export interface ModalVars extends React.CSSProperties {
    '--modal-animation-duration': string;
}