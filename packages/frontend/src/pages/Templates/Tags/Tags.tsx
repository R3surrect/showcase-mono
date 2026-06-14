import Heading from '@/components/entities/Heading/Heading.tsx'
import Surface from '@/components/entities/Surface/Surface.tsx'
import Grid from '@/components/entities/Grid/Grid'
import Input from '@components/entities/Input/Input'
import Stack from '@components/entities/Stack/Stack'
import Tag from '@components/entities/Tag/Tag'
import ColorList from '@/components/entities/ColorList/ColorList'
import EmojiPicker from '@/components/entities/EmojiPicker/EmojiPicker'
import Button from '@/components/entities/Button/Button'
import Text from '@/components/entities/Text/Text'
import { useCreateTagQuery, useGetTagsQuery } from '@/components/entities/Tag/api/Tag.query'
import { useDevice } from '@/hooks/useDevice'
import { tagListBreakpoints } from './Tags.constants'
import { tagCreateInputSchema } from '@showcase-mono/backend/routes/api/v1/templates/tags/validations/tag.create.validation'
import { treeifyError } from 'zod'

// TODO Отработать ситуацию с легкой тенью текста и внутренней тени,
// TODO чтобы если юзер решил создать тег под цвет фона - все равно было видно

export const Component = () => {
    const isMobile = useDevice('mobile');
    const isTablet = useDevice('tablet');

    const { mutate } = useCreateTagQuery();

    const breakpoint = isMobile
        ? tagListBreakpoints.mobile
        : isTablet
            ? tagListBreakpoints.tablet
            : tagListBreakpoints.desktop

    const { data, isError, error } = useGetTagsQuery();

    const tags = data ?? [];
    const hasMoreTags = tags.length > breakpoint;
    const visibleTags = hasMoreTags ? tags.slice(0, breakpoint) : tags;

    const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const rawTag = Object.fromEntries(data.entries());
        const result = tagCreateInputSchema.safeParse({
            label: rawTag.label,
            emoji: rawTag.emoji,
            color: JSON.parse(rawTag.color.toString()),
        });
        console.log({
            label: rawTag.label,
            emoji: rawTag.emoji,
            color: JSON.parse(rawTag.color.toString()),
        });

        if (!result.success) return console.error(treeifyError(result.error));

        mutate(result.data)
    }

    return <>
        <form onSubmit={submitHandler}>
            <Surface>
                <Stack gap='md'>
                    <Heading level={3} variant='secondary'>Создать тег</Heading>
                    <Grid columns={2} templateColumns='12fr 1fr'>
                        <Input name='label' labelText='Название' placeholder='Новый тег' autoComplete='off' inputMode='text' />
                        <EmojiPicker label='Иконка' placeholderEmoji='🏷️' />
                    </Grid>
                    <ColorList />
                    <Button type='submit'>Создать тег</Button>
                </Stack>
            </Surface>
        </form>

        <Surface>
            <Stack gap='md'>
                <Heading level={3} variant='secondary'>Существующие теги</Heading>
                <Stack direction='row' gap='sm' wrap={true} align='center'>
                    {tags.length === 0 && <Tag label='Tags list empty' color={{ h: 68, s: 30, l: 21 }} emoji={'♻'} />}
                    {
                        !isError && visibleTags.slice(0, breakpoint).map((item) => (
                            <Tag
                                {...item}
                                key={item.id}
                                id={item.id}
                            />
                        ))
                    }
                    {!isError && hasMoreTags && <Text weight='bold' color='darkgray' >+ {tags.length - breakpoint}</Text>}
                    {isError && <Text color='orange' weight='bolder'>{error.name}: {error.message}</Text>}
                </Stack>
            </Stack>
        </Surface>
    </>
}