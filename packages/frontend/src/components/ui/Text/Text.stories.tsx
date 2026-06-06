import type { Meta, StoryObj } from '@storybook/react-vite';
import Text from './Text';
import { AS_TYPES, COLOR_TYPES, SIZE_TYPES, WEIGHTS_TYPES } from './Text.constants';

const meta: Meta<typeof Text> = {
    title: 'UI/Text',
    component: Text,

    argTypes: {
        as: { control: { type: 'select' }, options: [...AS_TYPES] },
        size: { control: { type: 'select' }, options: [...SIZE_TYPES] },
        weight: { control: { type: 'select' }, options: [...WEIGHTS_TYPES] },
        color: { control: { type: 'select' }, options: [...COLOR_TYPES] },
    }
}

export const DefaultState: StoryObj<typeof Text> = {
    args: {
        size: 1,
        weight: 'regular',
        color: 'darkgray',
        as: 'p',
        children: 'text'
    }
}

export default meta;