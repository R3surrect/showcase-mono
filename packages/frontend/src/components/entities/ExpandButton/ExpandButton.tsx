import { LucideChevronRight } from "lucide-react";
import type { DivUiComponent } from "../_shared/system.types";
import stylesObj from './ExpandButton.module.css';
import { useState } from "react";

interface ExpandButtonProps extends DivUiComponent {
    defaultState?: boolean;
    onExpand: (expanded: boolean) => void;
}

const ExpandButton = ({ defaultState = false, onExpand }: ExpandButtonProps) => {
    const [expanded, setIsExpanded] = useState(defaultState);

    return <div
        className={stylesObj.expandButton}
        data-expanded={expanded}
        onClick={() => {
            setIsExpanded(!expanded);
            return onExpand(!expanded);
        }}
    >
        <LucideChevronRight color="var(--neutral-500)"/>
    </div>
}

export default ExpandButton;