import { useState } from 'react';
import { LucidePlusCircle } from 'lucide-react';
import type { ProjectGetOutput } from '@showcase-mono/backend/routes/api/v1/projects/projects.types';
import { useGetProjectsQuery, useUpdateProjectsQuery } from '@/queries/projects/projects.query';
import { ContentHeader } from '@/components/entities/ContentHeader/ContentHeader';
import ErrorMessage from '@/components/entities/ErrorMessage/ErrorMessage';
import ProjectCard from '@/components/entities/ProjectCard/ProjectCard';
import Surface from '@/components/entities/Surface/Surface';
import Button from '@/components/entities/Button/Button';
import Stack from '@/components/entities/Stack/Stack';
import Modal from '@/components/shared/Modal/Modal';
import Grid from '@/components/entities/Grid/Grid';
import Text from '@/components/entities/Text/Text';
import ProjectCreateForm from './create';
import { colord } from 'colord';

export type ProjectsMode = { type: 'idle' } | { type: 'create' } | { type: 'view', projectId: number };

export const Component = () => {
    const { data, isLoading, isError, error } = useGetProjectsQuery();
    // const { mutate: projectPinMutate, isError: projectPinIsError, error: projectPinError } = useUpdateProjectsQuery();
    const { mutate: projectPinMutate } = useUpdateProjectsQuery();

    const projects = data || [];

    const [pageState, setPageState] = useState<ProjectsMode>({ type: 'idle' });
    const [selectedProject, setSelectedProject] = useState<ProjectGetOutput>();

    const projectClickHandler = (id: number) => {
        setSelectedProject(data?.find((item: ProjectGetOutput) => item.id === id))
        setPageState({ projectId: id, type: 'view' });
    }

    const projectPinHandler = (id: number, isPinned: boolean) => projectPinMutate({ id: id, isPinned: !isPinned });

    return (
        <Stack direction='column'>
            <ContentHeader title='Проекты'>
                <Button variant='outline' size='sm' onClick={() => setPageState({ type: 'create' })}>
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
                        ? projects.length !== 0 ? projects.map((item: ProjectGetOutput) => (
                            <ProjectCard
                                key={item.id}
                                onClick={() => projectClickHandler(item.id)}
                                {...item}
                                id={item.id}
                                onPinClick={(projectId) => projectPinHandler(projectId, item.isPinned)}
                            />
                        ))
                            : <Text>Projects are empty</Text>
                        : <ErrorMessage message={error.message} />
                }
            </Grid>
            {
                <Modal
                    isOpen={pageState.type !== 'idle'}
                    onClose={() => setPageState({ type: 'idle' })}
                >
                    <Surface height='fit' width='50vw' >
                        {
                            (selectedProject && pageState.type === 'view') &&
                            <Surface
                                height='fit'
                                variant='outline'
                                color={colord(selectedProject.color).toHslString()}
                            >
                                <ProjectCard
                                    {...selectedProject}
                                    color={colord(selectedProject.color).toHsl()}
                                    hasSurface={false}
                                    id={selectedProject.id}
                                    onPinClick={(projectId) => projectPinHandler(projectId, selectedProject.isPinned)}
                                />
                            </Surface>
                        }
                        {pageState.type === 'create' && <ProjectCreateForm />}
                    </Surface>
                </Modal>
            }
        </Stack >
    )
}
