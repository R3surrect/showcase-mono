import Grid from "@/components/entities/Grid/Grid";
import Input from "@/components/entities/Input/Input";
import Select from "@/components/entities/Select/Select";
import Stack from "@/components/entities/Stack/Stack";
import TagList from "@/components/entities/TagList/TagList";
import Text from "@/components/entities/Text/Text";
import useToast from "@/components/entities/Toast/Toast.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TaskCreateInput } from "@showcase-mono/backend/routes/api/v1/tasks/tasks.types";
import { taskCreateInputValidation } from "@showcase-mono/backend/routes/api/v1/tasks/validations/task.create";
import { Controller, useForm } from "react-hook-form";

const TaskCreate = () => {
    const { pushToast, clearToasts } = useToast();

    const { register, handleSubmit, control, formState: { isSubmitting } } = useForm({
        resolver: zodResolver(taskCreateInputValidation),
        mode: 'onBlur',
        defaultValues: {}
    })

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
                    <Select
                        value={field.value}
                        setValue={(item: number) => field.onChange(item)}
                    >
                        <option value={1}>Project j</option>
                        <option value={2}>Project k</option>
                        <option value={3}>Project l</option>
                        <option value={4}>Project m</option>
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
        <Stack direction="row">

        </Stack>
    </Stack>
}

export default TaskCreate;