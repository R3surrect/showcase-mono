import Button from '@/components/entities/Button/Button';
import { ContentHeader } from '@/components/entities/ContentHeader/ContentHeader';
import Project from '@/components/entities/ProjectCard/ProjectCard';
import Stack from '@/components/entities/Stack/Stack';
import { LucidePlusCircle } from 'lucide-react';
// import { mockData } from './Project.constants';
import { useGetProjectsQuery } from '@/components/entities/ProjectCard/api/ProjectCard.query';
import ErrorMessage from '@/components/entities/ErrorMessage/ErrorMessage';
import Text from '@/components/entities/Text/Text';
import Grid from '@/components/entities/Grid/Grid';

export const Component = () => {
    const { data, isLoading, isError, error } = useGetProjectsQuery();
    const projects = data || [];

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
            <Grid columns={3} gap='md'>
                {isLoading
                    ? <Text>...loading</Text>
                    : !isError
                        ? projects.map(item => (
                            <Project
                                key={item.id}
                                {...item}
                                id={item.id.toString()}
                            />
                        ))
                        : <ErrorMessage message={error.message} />
                }
            </Grid>
        </Stack >
    )
}
