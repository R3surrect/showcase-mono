import { useState } from "react";
import z from "zod";
import { LucidePlusCircle } from "lucide-react";
import ColorList from "@/components/entities/ColorList/ColorList";
import EmojiPicker from "@/components/entities/Emoji/EmojiPicker/EmojiPicker";
import Heading from "@/components/entities/Heading/Heading";
import Input from "@/components/entities/Input/Input";
import Stack from "@/components/entities/Stack/Stack";
import Text from "@/components/entities/Text/Text";
import Button from "@/components/entities/Button/Button";
import EmojiPreview from "@/components/entities/Emoji/EmojiPreview/EmojiPreview";
import { useUpdateProjectsQuery } from "@/components/entities/ProjectCard/api/ProjectCard.query";
import { projectCreateInputValidation } from "@showcase-mono/backend/routes/api/v1/projects/validations/project.create";
import useToast from "@/components/entities/Toast/Toast.hook";
import type { ProjectCreateInput } from "@showcase-mono/backend/routes/api/v1/projects/projects.types";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ProjectCreateForm = () => {
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const { mutate, isError, error, isPending } = useUpdateProjectsQuery();
    const { pushToast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<ProjectCreateInput>({
        resolver: zodResolver(projectCreateInputValidation),
        mode: 'onBlur',

    });

    const onSubmit = (data: z.infer<typeof projectCreateInputValidation>) => {
        // e.preventDefault();
        // const formData = new FormData(e.currentTarget);
        // const rawTag = Object.fromEntries(formData.entries());
        // const result = projectCreateInputValidation.safeParse(rawTag);

        if (isError) return console.error(error);

        mutate(data);
    }

    const onError: SubmitErrorHandler<ProjectCreateInput> = (errors) => {
        Object.values(errors).forEach((error) => {
            if (error?.message) {
                pushToast({
                    text: String(error.message),
                    type: 'popup',
                    label: 'Validation error',
                    status: 'error'
                });
            }
        });
    }

    return <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Stack gap="md">
            <Heading
                level={3}
                variant="secondary"
                weight="bolder"
            >
                Новый проект
            </Heading>
            <Input labelText="Label" placeholder="Project label" {...register('label')} />
            <Input labelText="Description" placeholder="Description..." {...register('details')} />
            <Stack gap="sm" >
                <Stack direction="row" gap="sm">
                    {
                        selectedEmoji ? <>
                            <Text size={6} color='var(--neutral-550)' weight='bolder'>Selected Icon:</Text>
                            <EmojiPreview emoji={selectedEmoji} setEmoji={setSelectedEmoji} {...register('emoji')} />
                            <Text size={6} weight='bold' color='var(--neutral-300)'>(right click to reset)</Text>
                        </>
                            : <Text size={6} color='var(--neutral-550)' weight='bolder'>Icon</Text>
                    }
                </Stack>
                <EmojiPicker variant="keyboard" onEmojiChange={(emoji: string) => setSelectedEmoji(emoji)} />
            </Stack>
            <ColorList {...register('color')} />
            <Button type="submit" width="max" disabled={isPending || isSubmitting}>
                <Stack direction="row" align="center" gap='sm'>
                    <LucidePlusCircle />
                    Создать проект
                </Stack>
            </Button>
        </Stack>
    </form>
}

export default ProjectCreateForm;