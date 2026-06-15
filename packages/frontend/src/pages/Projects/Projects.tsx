import Project from '@/components/entities/Project/Project';
import Stack from '@/components/entities/Stack/Stack';

export const Component = () => {
    const mockData = [
        {
            id: '1',
            label: 'Some Project 1',
            color: { h: 11, s: 35, l: 47 },
            emoji: '💫',
            description: 'Some Long Description',
        },
        {
            id: '2',
            label: 'Some Project 2',
            color: { h: 11, s: 35, l: 47 },
            emoji: '❤',
            description: 'Some Long Description',
        },
        {
            id: '3',
            label: 'Some Project 3',
            color: { h: 11, s: 15, l: 1 },
            emoji: '➰',
            description: 'Some Long Description',
        },
    ]
    return (
        <>
            <Stack direction='row'>
                {mockData.map(item => (
                    <Project
                        key={item.id}
                        {...item}
                    />
                ))}

            </Stack>
        </>
    )
}
