import { useState } from 'react'
import { treeifyError } from 'zod'
import Heading from '@/components/entities/Heading/Heading.tsx'
import Grid from '@/components/entities/Grid/Grid'
import Surface from '@/components/entities/Surface/Surface.tsx'
import Input from '@components/entities/Input/Input'
import Stack from '@components/entities/Stack/Stack'
import Tag from '@components/entities/Tag/Tag'
import ColorList from '@/components/entities/ColorList/ColorList'
import Button from '@/components/entities/Button/Button'
import Text from '@/components/entities/Text/Text'
import { tagCreateInputValidation } from '@showcase-mono/backend/routes/api/v1/templates/tags/validations/tag.create'
import SegmentedPicker from '@/components/entities/SegmentedPicker/SegmentedPicker'
import { tagTypeConfigs } from '@showcase-mono/backend/routes/api/v1/templates/tags/tag.schema'
import {
    useCreateTagQuery,
    useDeleteTagQuery,
    useGetTagsQuery
} from '@/queries/tags/tags.query'
import type { TagGetOutput } from '@showcase-mono/backend/routes/api/v1/templates/tags/tag.types'

// TODO Отработать ситуацию с легкой тенью текста и внутренней тени,
// TODO чтобы если юзер решил создать тег под цвет фона - все равно было видно

// export const TAG_TYPE_PROPS = [
//     { id: 16, color: { h: 207, s: 20, l: 50 }, type: 'custom', category: 'category', label: "Default" },
//     { id: 33, color: { h: 11, s: 35, l: 47 }, type: 'custom', category: 'category', label: "Priority" },
//     { id: 13, color: { h: 35, s: 39, l: 53 }, type: 'custom', category: 'category', label: "Status" },
//     { id: 84, color: { h: 142, s: 25, l: 45 }, type: 'custom', category: 'category', label: "Time" },
//     { id: 12, color: { h: 275, s: 25, l: 52 }, type: 'custom', category: 'category', label: "People" },
// ] as const;

export const Component = () => {
    const { mutate: createMutate } = useCreateTagQuery();
    const { mutate: deleteMutate } = useDeleteTagQuery();

    const { data, isError, error } = useGetTagsQuery();
    const tags = data ?? [];

    const [selectedType, setSelectedType] = useState<string>(Object.keys(tagTypeConfigs)[0]);

    const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const rawTag = Object.fromEntries(data.entries());
        const result = tagCreateInputValidation.safeParse({ ...rawTag });

        if (!result.success) return console.error(treeifyError(result.error));
        createMutate(result.data)
    }

    // console.log({
    //     fromObject: TAG_TYPE_PROPS[0].label,
    //     fromJsx: '📦 label'
    // });

    //* Внедрить rhf+zod валидацию
    return <Grid columns={2} autoRows='1fr' height='max'>
        <form onSubmit={submitHandler}>
            <Surface height='fit'>
                <Stack gap='md'>
                    <Heading level={3} variant='secondary'>Create Tag</Heading>
                    <Input
                        name='label'
                        labelText='Название'
                        placeholder='Новый тег'
                        autoComplete='off'
                        inputMode='text'
                        hasEmojiPicker
                    />
                    <SegmentedPicker label='Selected type:' name='type' value={selectedType}>
                        {
                            Object.entries(tagTypeConfigs).map(([type, config]) =>
                                <Tag
                                    key={type}
                                    color={config.color}
                                    label={config.label}
                                    data-interactive
                                    data-selected={type === selectedType}
                                    onClick={() => setSelectedType(type)}
                                    variant='system'
                                    isSystem
                                />
                            )
                        }
                    </SegmentedPicker>
                    <Input
                        name='category'
                        labelText='Категория'
                        placeholder='Наименование категории'
                        inputMode='text'
                    // hasEmojiPicker
                    />
                    <ColorList name='color' />
                    <Button type='submit' width='max'>Send new tag</Button>
                </Stack>
            </Surface>
        </form>

        <Surface height='max'>
            <Stack gap='md' height='max'>
                <Heading level={3} variant='secondary'>Existing tags</Heading>
                <Stack
                    direction='row'
                    gap='sm'
                    wrap={true}
                    align='start'
                    height='max'
                    overflow='auto'
                >
                    {
                        (!isError && tags.length !== 0) ? tags.map((item: TagGetOutput) => (
                            <Tag
                                {...item}
                                key={item.id}
                                id={item.id}
                                isEditable
                                onDeleteAction={(id: number) => deleteMutate(id)}
                                onEditAction={(id: number) => console.log(`edit(${id})`)}
                            />
                        ))
                            : <Text weight='bold'>No tags created</Text>
                    }
                    {isError && <Text color='orange' weight='bolder'>{error.name}: {error.message}</Text>}
                </Stack>
            </Stack>
        </Surface>
    </Grid>
}