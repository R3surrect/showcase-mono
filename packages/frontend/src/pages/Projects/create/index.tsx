import { Controller } from "react-hook-form";
import { LucidePlusCircle } from "lucide-react";
import type { HslColor } from "colord";

import Tag from "@/components/entities/Tag/Tag";
import Text from "@/components/entities/Text/Text";
import Input from "@/components/entities/Input/Input";
import Stack from "@/components/entities/Stack/Stack";
import Button from "@/components/entities/Button/Button";
import Heading from "@/components/entities/Heading/Heading";
import TagList from "@/components/entities/TagList/TagList";
import ColorList from "@/components/entities/ColorList/ColorList";
import EmojiPicker from "@/components/entities/Emoji/EmojiPicker/EmojiPicker";
import EmojiPreview from "@/components/entities/Emoji/EmojiPreview/EmojiPreview";
import SegmentedPicker from "@/components/entities/SegmentedPicker/SegmentedPicker";
import { useProjectCreatePage } from "./useProjectCreatePage";

const ProjectCreateForm = () => {
    const {
        onSubmit,
        onError,
        handleSubmit,
        selectedEmoji,
        setSelectedEmoji,
        register,
        control,
        isPrioritiesLoading,
        priorities,
        isStatusesLoading,
        statuses,
        isProjectsPending,
        isSubmitting
    } = useProjectCreatePage();

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
                                : priorities.map((rawItem) => {
                                    const { id, ...item } = rawItem;
                                    const isSystemTag = item.category.trim().toLowerCase() === 'system';

                                    return isSystemTag
                                        ? <Tag
                                            key={item.createdAt}
                                            data-interactive
                                            data-selected={field.value === id}
                                            onClick={() => field.onChange(id)}
                                            {...item}
                                            isSystem={true}
                                        >
                                            <span>{item.label}</span>
                                        </Tag>
                                        : <Tag
                                            key={id}
                                            id={id}
                                            data-interactive
                                            data-selected={field.value === id}
                                            onClick={() => field.onChange(id)}
                                            {...item}
                                            isSystem={false}
                                        >
                                            <span>{item.label}</span>
                                        </Tag>

                                })
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
                                : statuses.map((item) => {
                                    const isSystem = item.category.trim().toLowerCase() === 'system';
                                    return isSystem ? (
                                        <Tag
                                            key={item.id}
                                            type={item.type}
                                            isSystem={true}
                                            color={item.color}
                                            data-interactive
                                            data-selected={field.value === item.id}
                                            onClick={() => field.onChange(item.id)}
                                        >
                                            <span>{item.label}</span>
                                        </Tag>
                                    ) :
                                        <Tag
                                            id={item.id}
                                            type={item.type}
                                            category={item.category}
                                            isSystem={false}
                                            key={item.id}
                                            createdAt={item.createdAt}
                                            color={item.color}
                                            data-interactive
                                            data-selected={field.value === item.id}
                                            onClick={() => field.onChange(item.id)}
                                        >
                                            <span>{item.label}</span>
                                        </Tag>
                                })
                        }
                        {/* <ExpandButton onExpand={() => { }} /> */}
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