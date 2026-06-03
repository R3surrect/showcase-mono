import Heading from '@/components/ui/Heading/Heading.tsx'
import Surface from '@/components/ui/Surface/Surface.tsx'
import Grid from '@/components/ui/Grid/Grid'
import Input from '@components/ui/Input/Input'
import Stack from '@components/ui/Stack/Stack'
// import { Grid } from '@components/ui/Grid/Grid'
// import Button from '@components/ui/Button/Button'
import Tag from '@components/ui/Tag/Tag'
import { tagMock } from './Tags.constants'
import ColorList from '@/components/ui/ColorList/ColorList'
import EmojiPicker from '@/components/ui/EmojiPicker/EmojiPicker'
import Button from '@/components/ui/Button/Button'

// TODO Отработать ситуацию с легкой тенью текста и внутренней тени,
// TODO чтобы если юзер решил создать тег под цвет фона - все равно было видно

export const Component = () => {
    return <>
        <Surface>
            <Stack gap='md'>
                <Heading level={3} variant='secondary'>Создать тег</Heading>
                <Grid columns={2} templateColumns='12fr 1fr'>
                    <Input labelText='Название' placeholder='Новый тег' autoComplete='off' inputMode='text'/>
                    <EmojiPicker label='Иконка' placeholderEmoji='🏷️' exportEmoji={(emoji) => { console.log(emoji); return '' }} />
                </Grid>
                <ColorList />
                <Button>Создать тег</Button>
            </Stack>
        </Surface>

        <Surface>
            <Stack gap='md'>
                <Heading level={3} variant='secondary'>Существующие теги</Heading>
                <Stack direction='row' gap='sm' wrap={true}>
                    {
                        tagMock.map((item) => (
                            <Tag {...item} key={item.id} />
                        ))
                    }
                </Stack>
            </Stack>
        </Surface>
    </>
}
