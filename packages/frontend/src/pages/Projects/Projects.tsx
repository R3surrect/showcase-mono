import { useState } from 'react';
import { motion } from 'motion/react';
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
import { AnimatePresence } from 'motion/react';

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
                <AnimatePresence>
                    {isLoading
                        ? <Text>...loading</Text>
                        : !isError
                            ? projects.length !== 0 ? projects.map((project: ProjectGetOutput) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{type: 'tween', duration: 0.3}}
                                >
                                    <ProjectCard
                                        onClick={() => projectClickHandler(project.id)}
                                        {...project}
                                        id={project.id}
                                        onPinClick={(projectId) => projectPinHandler(projectId, project.isPinned)}
                                    />
                                </motion.div>
                            ))
                                : <Text>Projects are empty</Text>
                            : <ErrorMessage message={error.message} />
                    }
                </AnimatePresence>
            </Grid>
            {
                <Modal
                    isOpen={pageState.type !== 'idle'}
                    onClose={() => setPageState({ type: 'idle' })}
                >
                    <Surface height='90vh' width='50vw' overflow='auto'>
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
