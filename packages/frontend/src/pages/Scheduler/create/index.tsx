import { isValidElement } from "react";
import { Controller } from "react-hook-form";
import { LucideCheckCircle2 } from "lucide-react";
import dayjs from "dayjs";
import Button from "@/components/entities/Button/Button";
import EmojiPreview from "@/components/entities/Emoji/EmojiPreview/EmojiPreview";
import Input from "@/components/entities/Input/Input";
import SegmentedPicker from "@/components/entities/SegmentedPicker/SegmentedPicker";
import Select from "@/components/entities/Select/Select";
import Stack from "@/components/entities/Stack/Stack";
import Tag from "@/components/entities/Tag/Tag";
import TagList from "@/components/entities/TagList/TagList";
import Text from "@/components/entities/Text/Text";
import { useCreateTaskPage } from "./useCreateTaskPage";
import type { OptionType, TaskCreateFormProps } from "./types";


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

const TaskCreateForm = ({ selectedDate }: TaskCreateFormProps) => {
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
            <Input
                labelText="Title"
                placeholder="Task label"
                {...register('label')}
            />
            <Input
                labelText="Description"
                placeholder="Task description"
                {...register('details')}
            />
            <Stack direction="row">
                <Input
                    labelText="Deadline datetime"
                    min={dayjs().format('YYYY-MM-DD')}
                    type="date"
                    {...register('deadline')}
                    width='max'
                />
                <Input
                    labelText="Notify datetime"
                    type="datetime-local"
                    {...register('notifyAt')}
                    min={dayjs().add(5, 'minute').format('YYYY-MM-DDTHH:mm')}
                    width='100%'
                />
                <Controller
                    name="projectId"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} setValue={(id) => { console.log(id); field.onChange(id) }} labelText="Project">
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
            </Stack>
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
                <Button
                    variant="accent"
                    width="max"
                    type="submit"
                    disabled={isSubmitting || isProjectsLoading}
                >
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