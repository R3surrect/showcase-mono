import Button from "@/components/entities/Button/Button";
import EmojiPreview from "@/components/entities/Emoji/EmojiPreview/EmojiPreview";
import Grid from "@/components/entities/Grid/Grid";
import Input from "@/components/entities/Input/Input";
import Select from "@/components/entities/Select/Select";
import Stack from "@/components/entities/Stack/Stack";
import TagList from "@/components/entities/TagList/TagList";
import Text from "@/components/entities/Text/Text";
import useToast from "@/components/entities/Toast/Toast.hook";
import { useGetProjectsQuery } from "@/queries/projects/projects.query";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Project } from "@showcase-mono/backend/routes/api/v1/projects/projects.types";
import type { TaskCreateInput } from "@showcase-mono/backend/routes/api/v1/tasks/tasks.types";
import { taskCreateInputValidation } from "@showcase-mono/backend/routes/api/v1/tasks/validations/task.create";
import { LucideCheckCircle2, LucideXCircle } from "lucide-react";
import { isValidElement } from "react";
import { Controller, useForm } from "react-hook-form";

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

const TaskCreate = () => {
    const { pushToast, clearToasts } = useToast();

    const { register, handleSubmit, control, formState: { isSubmitting } } = useForm({
        resolver: zodResolver(taskCreateInputValidation),
        mode: 'onBlur',
        defaultValues: {}
    })

    const { data: projects = [], isLoading: isProjectsLoading } = useGetProjectsQuery();

    const onSubmit = (data: TaskCreateInput) => {
        clearToasts();
        createTask(data);

        pushToast({
            text: `task ${data.label} created`,
            type: 'popup',
            label: 'Created',
            status: 'success'
        });
    }

    return <Stack>
        <Text size={5} color="var(--monochrome-800)">New task</Text>
        <Input labelText="Title" placeholder="Task label" />
        <Input labelText="Description" placeholder="Task description" />
        <Grid columns={2} >
            <Input labelText="Deadline datetime" type="date" />
            <Input labelText="Notify datetime" type="datetime-local" />
            <Input labelText="Deadline" type="date" />
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
            <Button variant="outline" width="max">
                <Stack direction="row" align="center">
                    <LucideXCircle />
                    Cancel
                </Stack>
            </Button>
            <Button variant="accent" width="max">
                <Stack direction="row" align="center">
                    <LucideCheckCircle2 />
                    Create
                </Stack>
            </Button>
        </Stack>
    </Stack >
}

export default TaskCreate;