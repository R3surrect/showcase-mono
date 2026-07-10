import { useState } from "react";
import { treeifyError } from "zod";
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

const ProjectCreateForm = () => {
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const { isLoading, mutate, isError, error } = useUpdateProjectsQuery();

    const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const rawTag = Object.fromEntries(formData.entries());
        const result = projectCreateInputValidation.safeParse(rawTag);

        if (!result.success) return console.error(treeifyError(result.error));

        mutate(result.data);
    }

    return <form onSubmit={submitHandler}>
        <Stack gap="md">
            <Heading level={3} variant="secondary" weight="bolder">Новый проект</Heading>
            <Input labelText="Label" placeholder="Project label" name="label" />
            <Input labelText="Description" placeholder="Description..." name="details" />
            <Stack direction="row" gap="sm">
                {
                    selectedEmoji ? <>
                        <Text size={4} weight='bold' color='lightgray'>Selected Icon:</Text>
                        <EmojiPreview emoji={selectedEmoji} setEmoji={setSelectedEmoji} name="emoji" />
                        <Text size={5} weight='bold' color='lightgray'>(right click to reset)</Text>
                    </>
                        : <Text size={4} weight='bold' color='lightgray'>Icon</Text>
                }
            </Stack>
            <EmojiPicker variant="keyboard" onEmojiChange={(emoji: string) => setSelectedEmoji(emoji)} />
            <ColorList />
            <Button type="submit" width="max" disabled={isLoading}>
                <Stack direction="row" align="center" gap='sm'>
                    <LucidePlusCircle />
                    Создать проект
                </Stack>
            </Button>
        </Stack>
    </form>
}

export default ProjectCreateForm;