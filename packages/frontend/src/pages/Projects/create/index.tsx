import z from "zod";
import { useState } from "react";
import type { HslColor } from "colord";
import { LucidePlusCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitErrorHandler } from "react-hook-form";

import Tag from "@/components/entities/Tag/Tag";
import Text from "@/components/entities/Text/Text";
import Input from "@/components/entities/Input/Input";
import Stack from "@/components/entities/Stack/Stack";
import Button from "@/components/entities/Button/Button";
import Heading from "@/components/entities/Heading/Heading";
import useToast from "@/components/entities/Toast/Toast.hook";
import ColorList from "@/components/entities/ColorList/ColorList";
import { useGetStatusesQuery } from "@/queries/statuses/statuses.query";
import { useCreateProjectQuery } from "@/queries/projects/projects.query";
import { useGetPrioritiesQuery } from "@/queries/priorities/priority.query";
import EmojiPicker from "@/components/entities/Emoji/EmojiPicker/EmojiPicker";
import EmojiPreview from "@/components/entities/Emoji/EmojiPreview/EmojiPreview";
import SegmentedPicker from "@/components/entities/SegmentedPicker/SegmentedPicker";
import { DEFAULT_COLOR } from "@/components/entities/ColorList/ColorList.constants";
import type { ProjectCreateInput } from "@showcase-mono/backend/routes/api/v1/projects/projects.types";
import { projectCreateInputValidation } from "@showcase-mono/backend/routes/api/v1/projects/validations/project.create";
import TagList from "@/components/entities/TagList/TagList";
import ExpandButton from "@/components/entities/ExpandButton/ExpandButton";

const ProjectCreateForm = () => {
    const [selectedEmoji, setSelectedEmoji] = useState('');

    const { data: priorityData, isLoading: isPrioritiesLoading } = useGetPrioritiesQuery();
    const { data: statusesData, isLoading: isStatusesLoading } = useGetStatusesQuery('project');
    const { mutate: createProject, isPending: isProjectsPending } = useCreateProjectQuery();
    const { pushToast, clearToasts } = useToast();

    const priorities = priorityData || [];
    const statuses = statusesData || [];

    const { register, handleSubmit, control, formState: { isSubmitting } } = useForm({
        resolver: zodResolver(projectCreateInputValidation),
        mode: 'onBlur',
        defaultValues: { color: DEFAULT_COLOR.color }
    });

    const onSubmit = (data: z.infer<typeof projectCreateInputValidation>) => {
        clearToasts();
        createProject({ ...data, color: data.color });

        pushToast({
            text: `Project ${data.label} created`,
            type: 'popup',
            label: 'Created',
            status: 'success'
        });
    }

    const onError: SubmitErrorHandler<ProjectCreateInput> = (errors) => {
        clearToasts();

        Object.entries(errors).forEach(([fieldName, error]) => {
            if (error?.message) {
                pushToast({
                    text: `${fieldName}: ${error.message}`,
                    type: 'popup',
                    label: 'Validation error',
                    status: 'error'
                });
            }
        });
    }

    return <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Stack gap="md">
            <Heading level={3} variant="secondary" weight="bolder">Новый проект</Heading>
            <Input labelText="Label" placeholder="Project label" {...register('label')} />
            <Input labelText="Description" placeholder="Description..." {...register('details')} />
            <Stack gap="sm" >
                <Stack direction="row" gap="sm">
                    {
                        selectedEmoji ? <>
                            <Text size={6} color='var(--cold-blue-gray-400)' weight='bolder'>Selected Icon:</Text>
                            <EmojiPreview emoji={selectedEmoji} setEmoji={setSelectedEmoji} {...register('emoji')} />
                            <Text size={6} weight='bold' color='var(--cold-blue-gray-400)'>(right click to reset)</Text>
                        </>
                            : <Text size={6} color='var(--cold-blue-gray-400)' weight='bolder'>Icon</Text>
                    }
                </Stack>
                <EmojiPicker variant="keyboard" onEmojiChange={(emoji: string) => setSelectedEmoji(emoji)} />
            </Stack>
            <Controller
                name="priorityTagId"
                control={control}
                render={({ field }) => (
                    <SegmentedPicker label="Priorities:">
                        {
                            isPrioritiesLoading
                                ? '...loading'
                                : priorities.map((item) => (
                                    <Tag
                                        key={item.id}
                                        data-interactive
                                        data-selected={field.value === item.id}
                                        onClick={() => field.onChange(item.id)}
                                        {...item}
                                        isSystem={item.category.trim().toLowerCase() === 'system'}
                                    >
                                        <span>{item.label}</span>
                                    </Tag>
                                ))
                        }
                        <ExpandButton onExpand={() => { }} />
                    </SegmentedPicker>
                )}
            />
            <Controller
                name="statusTagId"
                control={control}
                render={({ field }) => (
                    <SegmentedPicker label="Status:">
                        {
                            isStatusesLoading
                                ? '...loading'
                                : statuses.map((item) => (
                                    <Tag
                                        key={item.id}
                                        data-interactive
                                        data-selected={field.value === item.id}
                                        onClick={() => field.onChange(item.id)}
                                        {...item}
                                        isSystem={item.category.trim().toLowerCase() === 'system'}
                                    >
                                        <span>{item.label}</span>
                                    </Tag>
                                ))
                        }
                        <ExpandButton onExpand={() => { }} />
                    </SegmentedPicker>
                )}
            />
            <Controller
                name='tagIds'
                control={control}
                render={({ field }) => (
                    <TagList
                        selectedTags={field.value || []}
                        setSelectedList={(items: number[]) => field.onChange(items)}
                    />
                )}
            />
            <Controller
                name="color"
                control={control}
                render={({ field }) => (
                    <ColorList
                        value={field.value}
                        onColorChange={(color: HslColor) => field.onChange(color)}
                    />
                )}
            />
            <Button type="submit" width="max" disabled={isProjectsPending || isSubmitting}>
                <Stack direction="row" align="center" gap='sm'>
                    <LucidePlusCircle />
                    Создать проект
                </Stack>
            </Button>
            {/* //TODO реализовать подгрузку JSON'а задач с заметками */}
        </Stack>
    </form>
}

export default ProjectCreateForm