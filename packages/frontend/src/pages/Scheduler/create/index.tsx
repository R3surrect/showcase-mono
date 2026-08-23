import Button from "@/components/entities/Button/Button";
import EmojiPreview from "@/components/entities/Emoji/EmojiPreview/EmojiPreview";
import Grid from "@/components/entities/Grid/Grid";
import Input from "@/components/entities/Input/Input";
import SegmentedPicker from "@/components/entities/SegmentedPicker/SegmentedPicker";
import Select from "@/components/entities/Select/Select";
import Stack from "@/components/entities/Stack/Stack";
import Tag from "@/components/entities/Tag/Tag";
import TagList from "@/components/entities/TagList/TagList";
import Text from "@/components/entities/Text/Text";
import type { Project } from "@showcase-mono/backend/routes/api/v1/projects/projects.types";
import { LucideCheckCircle2 } from "lucide-react";
import { isValidElement } from "react";
import { Controller } from "react-hook-form";
import { useCreateTaskPage } from "./useCreateTaskPage";

type OptionType = Pick<Project, 'id' | 'emoji' | 'label'>;

const Option = ({ id, emoji, label }: OptionType) => {
    const emojiRender = isValidElement(emoji)
        ? emoji
        : <EmojiPreview emoji={String(emoji)} />;

    return <option value={id}>
        <Stack
            direction="row"
            align="center"
            gap="sm"
            width="max"
        >
            {emoji && emojiRender}
            <div>{label}</div>
        </Stack>
    </option>
};

export interface TaskCreateFormProps {
    selectedDate?: Date;
    setSelectedDate: (selectedDate: Date) => void;
}

const TaskCreateForm = ({ selectedDate, setSelectedDate }: TaskCreateFormProps) => {
    const {
        register,
        handleSubmit,
        control,
        isSubmitting,
        projects,
        isProjectsLoading,
        priorities,
        isPrioritiesLoading,
        statuses,
        isStatusesLoading,
        onSubmit,
        onError,
    } = useCreateTaskPage(selectedDate);

    return <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Stack>
            <Text size={5} color="var(--monochrome-800)">New task</Text>
            <Input labelText="Title" placeholder="Task label" {...register('label')} />
            <Input labelText="Description" placeholder="Task description" {...register('details')} />
            <Grid columns={2} >
                <Input labelText="Deadline datetime" type="date" value={selectedDate?.toISOString()} {...register('deadline')} />
                <Input labelText="Notify datetime" type="datetime-local" {...register('notifyAt')} />
                <Controller
                    name="projectId"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} setValue={field.onChange} labelText="Project">
                            <Option emoji={String.fromCodePoint(0x1F4E5)} id={0} label="None" key={0} />
                            {
                                !isProjectsLoading &&
                                projects.map(item =>
                                    <Option
                                        emoji={item.emoji}
                                        label={item.label}
                                        id={item.id}
                                        key={item.id}
                                    />
                                )
                            }
                        </Select>
                    )}
                />
            </Grid>
            <Controller
                name="priorityTagId"
                control={control}
                render={({ field }) => (
                    <SegmentedPicker label="Priorities:">
                        {
                            isPrioritiesLoading
                                ? '...loading'
                                : priorities.map((item) =>
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
                                )
                        }
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
                                : statuses.map((item) =>
                                    <Tag
                                        key={item.id}
                                        isSystem={item.category.trim().toLowerCase() === 'system'}
                                        data-interactive
                                        data-selected={field.value === item.id}
                                        onClick={() => field.onChange(item.id)}
                                        {...item}
                                    >
                                        <span>{item.label}</span>
                                    </Tag>
                                )
                        }
                    </SegmentedPicker>
                )}
            />
            <Controller
                name="tagIds"
                control={control}
                render={({ field }) => (
                    <TagList
                        selectedTags={field.value || []}
                        setSelectedList={(items: number[]) => field.onChange(items)}
                    />
                )}
            />
            <Stack direction="row" gap="sm">
                <Button variant="accent" width="max" type="submit" disabled={isSubmitting || isProjectsLoading}>
                    <Stack direction="row" align="center">
                        <LucideCheckCircle2 />
                        Create
                    </Stack>
                </Button>
            </Stack>
        </Stack >
    </form>
}

export default TaskCreateForm;