import Heading from '@/components/entities/Heading/Heading.tsx'
import Surface from '@/components/entities/Surface/Surface.tsx'
import Grid from '@/components/entities/Grid/Grid'
import Input from '@components/entities/Input/Input'
import Stack from '@components/entities/Stack/Stack'
// import { Grid } from '@components/ui/Grid/Grid'
// import Button from '@components/ui/Button/Button'
import Tag from '@components/entities/Tag/Tag'
import ColorList from '@/components/entities/ColorList/ColorList'
import EmojiPicker from '@/components/entities/EmojiPicker/EmojiPicker'
import Button from '@/components/entities/Button/Button'
import { useDevice } from '@/hooks/useDevice'
import Text from '@/components/entities/Text/Text'
import { useTagsQuery } from '@/components/entities/Tag/api/Tag.query'

// TODO Отработать ситуацию с легкой тенью текста и внутренней тени,
// TODO чтобы если юзер решил создать тег под цвет фона - все равно было видно

export const Component = () => {
    const tagListBreakpoints = {
        mobile: 15,
        tablet: 30,
        desktop: 45
    }
    const isMobile = useDevice('mobile');
    const isTablet = useDevice('tablet');

    const breakPoint = isMobile
        ? tagListBreakpoints.mobile
        : isTablet
            ? tagListBreakpoints.tablet
            : tagListBreakpoints.desktop

    const { data, isLoading, isError } = useTagsQuery();

    return <>
        <Surface>
            <Stack gap='md'>
                <Heading level={3} variant='secondary'>Создать тег</Heading>
                <Grid columns={2} templateColumns='12fr 1fr'>
                    <Input labelText='Название' placeholder='Новый тег' autoComplete='off' inputMode='text' />
                    <EmojiPicker label='Иконка' placeholderEmoji='🏷️' exportEmoji={(emoji) => { console.log(emoji); return '' }} />
                </Grid>
                <ColorList />
                <Button>Создать тег</Button>
            </Stack>
        </Surface>

        <Surface>
            <Stack gap='md'>
                <Heading level={3} variant='secondary'>Существующие теги</Heading>
                <Stack direction='row' gap='sm' wrap={true} align='center'>
                    {isLoading && <Text color='darkgray' weight='bold'>...loading</Text>}
                    {
                        data?.success && data?.tags.slice(0, breakPoint).map(({ id, ...item }) => (
                            <Tag {...item} key={id} />
                        ))
                    }
                    {
                        data?.success && data?.tags.length > breakPoint && <Text weight='bold' color='darkgray'>+ {data?.tags.length - breakPoint}</Text>
                    }
                    {isError && !data?.success && data?.error.map((err, i) =>
                        <Text
                            key={i}
                            color='orange'
                            weight='bolder'
                        >{err.message}</Text>
                    )}
                </Stack>
            </Stack>
        </Surface>
    </>
}
