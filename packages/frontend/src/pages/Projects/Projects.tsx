import Button from '@/components/entities/Button/Button';
import { ContentHeader } from '@/components/entities/ContentHeader/ContentHeader';
import Project from '@/components/entities/ProjectCard/ProjectCard';
import Stack from '@/components/entities/Stack/Stack';
import { LucidePlusCircle } from 'lucide-react';
import { mockData } from './Project.constants';

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
