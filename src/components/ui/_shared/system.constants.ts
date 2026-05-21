import type { LogicalAlignment, PhysicalAlignment } from "./system.types";

export const physicalToLogical: Record<PhysicalAlignment | LogicalAlignment, LogicalAlignment> = {
    left: 'start',
    right: 'end',
    start: 'start',
    end: 'end',
    center: 'center',
    stretch: 'stretch',
};