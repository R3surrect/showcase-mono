import { useState } from 'react';
import { LucidePlusCircle } from 'lucide-react';
import type { ProjectGetOutput } from '@showcase-mono/backend/routes/api/v1/projects/projects.types';
import { useGetProjectsQuery, useUpdateProjectsQuery } from '@/queries/projects/projects.query';
import { ContentHeader } from '@/components/entities/ContentHeader/ContentHeader';
import { getHslString } from '@/components/entities/ColorList/ColorList.constants';
import ErrorMessage from '@/components/entities/ErrorMessage/ErrorMessage';
import ProjectCard from '@/components/entities/ProjectCard/ProjectCard';
import Surface from '@/components/entities/Surface/Surface';
import Button from '@/components/entities/Button/Button';
import Stack from '@/components/entities/Stack/Stack';
import Modal from '@/components/shared/Modal/Modal';
import Grid from '@/components/entities/Grid/Grid';
import Text from '@/components/entities/Text/Text';
import ProjectCreateForm from './create';

export type ProjectsMode = { type: 'idle' } | { type: 'create' } | { type: 'view', projectId: string };

export const Component = () => {
    const { data, isLoading, isError, error } = useGetProjectsQuery();
    // const { mutate: projectPinMutate, isError: projectPinIsError, error: projectPinError } = useUpdateProjectsQuery();
    const { mutate: projectPinMutate } = useUpdateProjectsQuery();

    const projects = data || [];

    const [pageState, setPageState] = useState<ProjectsMode>({ type: 'idle' });
    const [selectedProject, setSelectedProject] = useState<ProjectGetOutput>();

    const projectClickHandler = (id: string) => {
        setSelectedProject(data?.find((item: ProjectGetOutput) => item.id.toString() === id))
        setPageState({ projectId: id, type: 'view' });
    }

    const projectPinHandler = (id: string, isPinned: boolean) => {
        if (!id) return;
        try {
            projectPinMutate({ id: Number(id), isPinned: !isPinned });
        } catch (e) {
            console.error('Error while updating project pin field', e);
        }
    }

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
                                onClick={() => projectClickHandler(item.id.toString())}
                                {...item}
                                id={item.id.toString()}
                                onPinClick={(projectId) => projectPinHandler(projectId.toString(), item.isPinned)}
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
                    <Surface>
                        {
                            (selectedProject && pageState.type === 'view') &&
                            <Surface
                                height='fit'
                                variant='outline'
                                color={getHslString(selectedProject.color)}
                            >
                                <ProjectCard
                                    {...selectedProject}
                                    hasSurface={false}
                                    id={selectedProject.id.toString()}
                                    onPinClick={(projectId) => projectPinHandler(projectId.toString(), selectedProject.isPinned)}
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
