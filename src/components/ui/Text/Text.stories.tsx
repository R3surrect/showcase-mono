import type { Meta, StoryObj } from '@storybook/react-vite';
import Text from './Text';

const meta: Meta<typeof Text> = {
    title: 'ui/Text',
    component: Text,
    tags: ['autodocs'],
    args: {
        size: 4,
        color: 'darkgray',
        children: 'Text here',
    },
    argTypes: {

    }
}

export default meta;