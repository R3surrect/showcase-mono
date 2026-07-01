import Button from '@/components/entities/Button/Button';
import { ContentHeader } from '@/components/entities/ContentHeader/ContentHeader';
import ProjectCard from '@/components/entities/ProjectCard/ProjectCard';
import Stack from '@/components/entities/Stack/Stack';
import { LucidePlusCircle } from 'lucide-react';
import { useGetProjectsQuery } from '@/components/entities/ProjectCard/api/ProjectCard.query';
import ErrorMessage from '@/components/entities/ErrorMessage/ErrorMessage';
import Text from '@/components/entities/Text/Text';
import Grid from '@/components/entities/Grid/Grid';
import Modal from '@/components/shared/Modal/Modal';
import Surface from '@/components/entities/Surface/Surface';
import { useState } from 'react';
import type { ProjectGetOutput } from '@showcase-mono/backend/routes/api/v1/projects/projects.types';
import { getHslString } from '@/components/entities/ColorList/ColorList.constants';

export type ProjectsMode = { type: 'idle' } | { type: 'create' } | { type: 'view', project: ProjectGetOutput };

export const Component = () => {
    const { data, isLoading, isError, error } = useGetProjectsQuery();
    const projects = data || [];

    
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectGetOutput>();

    const projectContextMenuClick = (id: number) => {
        setSelectedProject(data?.find(item => item.id === id))
        setIsViewModalOpen(true);
    }

    return (
        <Stack direction='column'>
            <ContentHeader title='Проекты'>
                <Button variant='outline' size='sm'>
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
                        ? projects.length !== 0 ? projects.map(item => (
                            <ProjectCard
                                key={item.id}
                                onClick={() => projectContextMenuClick(item.id)}
                                {...item}
                                id={item.id.toString()}
                            />
                        ))
                            : <Text>Projects are empty</Text>
                        : <ErrorMessage message={error.message} />
                }
            </Grid>
            {
                selectedProject &&
                <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(!isViewModalOpen)}>
                    <Surface>
                        <Surface height='fit' variant='outline' color={getHslString(selectedProject.color)}>
                            <ProjectCard
                                {...selectedProject}
                                hasSurface={false}
                                id={selectedProject.id.toString()}
                            />
                        </Surface>
                    </Surface>
                </Modal>
            }
        </Stack >
    )
}
