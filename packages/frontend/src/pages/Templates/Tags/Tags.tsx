import Heading from '@/components/entities/Heading/Heading.tsx'
import Surface from '@/components/entities/Surface/Surface.tsx'
import Input from '@components/entities/Input/Input'
import Stack from '@components/entities/Stack/Stack'
import Tag from '@components/entities/Tag/Tag'
import ColorList from '@/components/entities/ColorList/ColorList'
import Button from '@/components/entities/Button/Button'
import Text from '@/components/entities/Text/Text'
import { useCreateTagQuery, useGetTagsQuery } from '@/components/entities/Tag/api/Tag.query'
// import { useDevice } from '@/hooks/useDevice'
// import { tagListBreakpoints } from './Tags.constants'
import { treeifyError } from 'zod'
import { tagCreateInputValidation } from '@showcase-mono/backend/routes/api/v1/templates/tags/validations/tag.create'
import Grid from '@/components/entities/Grid/Grid'
import { createPortal } from 'react-dom'

// TODO Отработать ситуацию с легкой тенью текста и внутренней тени,
// TODO чтобы если юзер решил создать тег под цвет фона - все равно было видно

export const Component = () => {
    const slot = document.querySelector('#content-header-slot')
    // #region
    // const isMobile = useDevice('mobile');
    // const isTablet = useDevice('tablet');

    const { mutate } = useCreateTagQuery();

    // const breakpoint = isMobile
    //     ? tagListBreakpoints.mobile
    //     : isTablet
    //         ? tagListBreakpoints.tablet
    //         : tagListBreakpoints.desktop

    const { data, isError, error } = useGetTagsQuery();

    const tags = data ?? [];
    // const hasMoreTags = tags.length > breakpoint;
    // const visibleTags = hasMoreTags ? tags.slice(0, breakpoint) : tags;

    const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const rawTag = Object.fromEntries(data.entries());
        const result = tagCreateInputValidation.safeParse({
            label: rawTag.label,
            color: JSON.parse(rawTag.color.toString()),
        });

        if (!result.success) return console.error(treeifyError(result.error));

        mutate(result.data)
    }

    // #endregion
    // #region 
    //* Внедрить rhf+zod валидацию
    // #endregion 
    return <Grid columns={2} autoRows='1fr' height='max'>
        <form onSubmit={submitHandler}>
            <Surface height='fit'>
                <Stack gap='md'>
                    <Heading level={3} variant='secondary'>Создать тег</Heading>
                    <Input
                        name='label'
                        labelText='Название'
                        placeholder='Новый тег'
                        autoComplete='off'
                        inputMode='text'
                        hasEmojiPicker
                    />
                    <ColorList />
                    {
                        slot && createPortal(
                            <Button
                                type='submit'
                                width='max'
                                size='lg'
                            >Создать тег</Button>,
                            slot
                        )
                    }
                </Stack>
            </Surface>
        </form>

        <Surface height='max'>
            <Stack gap='md' height='max'>
                <Heading level={3} variant='secondary'>Существующие теги</Heading>
                <Stack
                    direction='row'
                    gap='sm'
                    wrap={true}
                    align='start'
                    height='max'
                    overflow='auto'
                >
                    {
                        // !isError && visibleTags.map((item) => (
                        (!isError && tags.length !== 0) ? tags.map((item) => (
                            <Tag
                                {...item}
                                key={item.id}
                                id={item.id}
                            />
                        ))
                            : <Text weight='bold'>No tags created</Text>
                    }
                    {/* {!isError && hasMoreTags && <Text weight='bold' color='darkgray' >+ {tags.length - breakpoint}</Text>} */}
                    {isError && <Text color='orange' weight='bolder'>{error.name}: {error.message}</Text>}
                </Stack>
            </Stack>
        </Surface>
    </Grid>
}