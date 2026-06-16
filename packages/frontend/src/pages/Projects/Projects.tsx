import Button from '@/components/entities/Button/Button';
import { ContentHeader } from '@/components/entities/ContentHeader/ContentHeader';
import Project from '@/components/entities/Project/Project';
import Stack from '@/components/entities/Stack/Stack';
import { LucidePlusCircle } from 'lucide-react';

const mockData = [
    {
        id: '1',
        label: 'Some Project 1',
        color: { h: 320, s: 35, l: 50 },
        emoji: '〰',
        description: 'Some Long Description 1',
        tasks: { completed: 25, pending: 50, overdue: 30, scheduled: 40, inProgress: 15 }
    },
    {
        id: '2',
        label: 'Some Project 2',
        color: { h: 150, s: 35, l: 50 },
        emoji: '❤',
        description: 'Some Long Description 2',
        tasks: { completed: 200, pending: 20, overdue: 1, scheduled: 40, inProgress: 15 }
    },
    {
        id: '3',
        label: 'Some Project 3',
        color: { h: 50, s: 35, l: 50 },
        emoji: '➰',
        description: 'Some Long Description 3',
        tasks: { completed: 95, pending: 50, overdue: 30, scheduled: 40, inProgress: 15 }
    },
]

export const Component = () => {
    return (
        <Stack direction='column'>
            <ContentHeader title='Проекты'>
                <Button variant='outline'>
                    <Stack direction='row' gap='sm' align='center'>
                        <LucidePlusCircle strokeWidth={1.5} />
                        Новый проект
                    </Stack>
                </Button>
            </ContentHeader>
            <Stack direction='row'>
                {mockData.map(item => (
                    <Project
                        key={item.id}
                        {...item}
                    />
                ))}
            </Stack>
        </Stack >
    )
}
