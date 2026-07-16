import type { TagGetOutput } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.types";
import type { AxisSizeVariations, DivUiComponent } from "../_shared/system.types";
import type { VARIANT_TYPES } from "./Tag.constants";

export type Variants = typeof VARIANT_TYPES[number];

// 1. Общие свойства для абсолютно любого тега
export interface GeneralProps extends Omit<Partial<DivUiComponent>, 'color' | 'id'> {
    width?: AxisSizeVariations;
    variant?: Variants;
}

// 2. Ветка А: Системный тег (без баз данных, ID и дат)
export interface SystemTag {
    isSystem: true;
    id?: never;
    createdAt?: never;
    updatedAt?: never;
    label: string;
    color: { h: number; s: number; l: number };
}

// 3. Ветка Б: Обычный тег из БД
export interface DefaultTag extends TagGetOutput {
    isSystem?: false;
}

// 4. Логика редактирования (твое дискриминантное объединение — тут всё ок)
export interface MutableProps {
    isEditable: true;
    onDeleteAction: (id: number) => void;
    onEditAction: (id: number) => void;
}

export interface ImmutableProps {
    isEditable?: false;
    onDeleteAction?: never;
    onEditAction?: never;
}

type EditableUnion = MutableProps | ImmutableProps;

// 5. Финальный тип TagProps
// Сначала объединяем логику данных (Системный ИЛИ Дефолтный),
// затем пересекаем с поведением (Редактируемый ИЛИ Нет),
// и в конце накидываем общие UI-пропсы.
export type TagProps = (SystemTag | DefaultTag) & EditableUnion & GeneralProps;

export interface ColorVariable extends React.CSSProperties {
    '--tag-color': string;
}