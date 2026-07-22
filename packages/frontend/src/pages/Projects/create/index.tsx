import z from "zod";
import { useState } from "react";
import { LucidePlusCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import Text from "@/components/entities/Text/Text";
import Input from "@/components/entities/Input/Input";
import Stack from "@/components/entities/Stack/Stack";
import Button from "@/components/entities/Button/Button";
import Heading from "@/components/entities/Heading/Heading";
import useToast from "@/components/entities/Toast/Toast.hook";
import ColorList from "@/components/entities/ColorList/ColorList";
import EmojiPicker from "@/components/entities/Emoji/EmojiPicker/EmojiPicker";
import EmojiPreview from "@/components/entities/Emoji/EmojiPreview/EmojiPreview";
import type { ProjectCreateInput } from "@showcase-mono/backend/routes/api/v1/projects/projects.types";
import { projectCreateInputValidation } from "@showcase-mono/backend/routes/api/v1/projects/validations/project.create";
import { useUpdateProjectsQuery } from "@/queries/projects/projects.query";
import { useGetCategoriesQuery } from "@/queries/tags/tags.query";
import SegmentedPicker from "@/components/entities/SegmentedPicker/SegmentedPicker";
import Tag from "@/components/entities/Tag/Tag";

const ProjectCreateForm = () => {
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number>();

    const { mutate, isError, error, isPending } = useUpdateProjectsQuery();
    const { pushToast } = useToast();
    const { isLoading: isCategoriesLoading, data: categoriesData } = useGetCategoriesQuery();

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

        if (isError) return pushToast({ label: 'Error', status: 'error', type: 'popup', text: error.message });

        mutate(data);
    }

    // 
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
            <Heading level={3} variant="secondary" weight="bolder">Новый проект</Heading>
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
            <SegmentedPicker label="Categories:">
                {
                    isCategoriesLoading
                        ? <Text>...loading</Text>
                        : categoriesData && categoriesData.map((item) => (
                            <Tag
                                key={item.id}
                                color={item.color}
                                label={item.category}
                                data-interactive
                                data-selected={item.id === selectedCategory}
                                onClick={() => setSelectedCategory(item.id)}
                                variant='system'
                                isSystem
                            />
                        ))
                }
            </SegmentedPicker>
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