import Heading from '@/components/entities/Heading/Heading.tsx'
import Surface from '@/components/entities/Surface/Surface.tsx'
import Input from '@components/entities/Input/Input'
import Stack from '@components/entities/Stack/Stack'
import Tag from '@components/entities/Tag/Tag'
import ColorList from '@/components/entities/ColorList/ColorList'
import Button from '@/components/entities/Button/Button'
import Text from '@/components/entities/Text/Text'
import { useCreateTagQuery, useGetTagsQuery } from '@/components/entities/Tag/api/Tag.query'
import { treeifyError } from 'zod'
import { tagCreateInputValidation } from '@showcase-mono/backend/routes/api/v1/templates/tags/validations/tag.create'
import Grid from '@/components/entities/Grid/Grid'
import SegmentedPicker from '@/components/entities/SegmentedPicker/SegmentedPicker'

// TODO Отработать ситуацию с легкой тенью текста и внутренней тени,
// TODO чтобы если юзер решил создать тег под цвет фона - все равно было видно

export const TAG_TYPE_PROPS = [
    { id: 0x2fa4, color: { h: 207, s: 20, l: 50 }, label: "📦 Default" },
    { id: 0xd3fa, color: { h: 11, s: 35, l: 47 }, label: "🔥 Priority" },
    { id: 0x13cf, color: { h: 35, s: 39, l: 53 }, label: "⚡ Status" },
    { id: 0x84fc, color: { h: 142, s: 25, l: 45 }, label: "⏳ Time" },
    { id: 0x1289, color: { h: 275, s: 25, l: 52 }, label: "👥 People" },
] as const;

export const Component = () => {
    const { mutate } = useCreateTagQuery();
    const { data, isError, error } = useGetTagsQuery();
    const tags = data ?? [];

    const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const rawTag = Object.fromEntries(data.entries());
        const result = tagCreateInputValidation.safeParse({
            label: rawTag.label,
            color: rawTag.color,
        });

        console.log(rawTag)
        if (!result.success) return console.error(treeifyError(result.error));
        mutate(result.data)
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
                    <SegmentedPicker label='Tag type:'>
                        {
                            TAG_TYPE_PROPS.map(item => (
                                <Tag {...item} key={item.id} data-interactive />
                            ))
                        }
                    </SegmentedPicker>
                    <ColorList name='color' />
                    <Button type='submit' width='max' size='lg' >Send new tag</Button>
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
                        (!isError && tags.length !== 0) ? tags.map((item) => (
                            <Tag
                                {...item}
                                key={item.id}
                                id={item.id}
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