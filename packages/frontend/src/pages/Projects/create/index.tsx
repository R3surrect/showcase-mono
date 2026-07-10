import { useState } from "react";

import ColorList from "@/components/entities/ColorList/ColorList";
import EmojiPicker from "@/components/entities/Emoji/EmojiPicker/EmojiPicker";
import Heading from "@/components/entities/Heading/Heading";
import Input from "@/components/entities/Input/Input";
import Stack from "@/components/entities/Stack/Stack";
import Text from "@/components/entities/Text/Text";
import Button from "@/components/entities/Button/Button";
import { LucidePlusCircle } from "lucide-react";
import EmojiPreview from "@/components/entities/Emoji/EmojiPreview/EmojiPreview";
import { useUpdateProjectsQuery } from "@/components/entities/ProjectCard/api/ProjectCard.query";

const ProjectCreateForm = () => {
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const {isLoading, mutate, isError, error} = useUpdateProjectsQuery();
    
    return <Stack gap="md">
        <Heading level={3} variant="secondary" weight="bolder">Новый проект</Heading>
        <Input labelText="Label" placeholder="Project label" />
        <Input labelText="Description" placeholder="Description..." />
        <Stack direction="row" gap="sm">
            {
                selectedEmoji ? <>
                    <Text size={4} weight='bold' color='lightgray'>Selected Icon:</Text>

                    {/* // TODO вынести в отдельный компонент вроде EmojiPreview со своими стилями */}
                    <EmojiPreview emoji={selectedEmoji} setEmoji={setSelectedEmoji} />
                    <Text size={5} weight='bold' color='lightgray'>(right click to reset)</Text>
                </>
                    : <Text size={4} weight='bold' color='lightgray'>Icon</Text>
            }
        </Stack>
        <EmojiPicker variant="keyboard" onEmojiChange={(emoji: string) => setSelectedEmoji(emoji)} />
        <ColorList />
        <Button type="submit" width="max">
            <Stack direction="row" align="center" gap='sm'>
                <LucidePlusCircle />
                Создать проект
            </Stack>
        </Button>
    </Stack>
}

export default ProjectCreateForm;