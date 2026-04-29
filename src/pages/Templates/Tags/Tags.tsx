import Heading from '@/components/ui/Heading/Heading.tsx'
import Surface from '@/components/ui/Surface/Surface.tsx'
import { Grid } from '@components/ui/Grid/Grid'
// import Button from '@components/ui/Button/Button'
import Input from '@components/ui/Input/Input'
import { ColorPicker } from '@components/ui/ColorPicker/ColorPicker'
import Stack from '@components/ui/Stack/Stack'

export const Component = () => {
    return <Grid columns={3}>
        <Surface>
            <Stack gap='md'>

                <Heading level={5} variant='secondary'>Создать тег</Heading>
                <Input labelText='Название' placeholder='Новый тег' type='text' />

                <ColorPicker />
            </Stack>
        </Surface>

        {/* <Button variant='outline'>Add Tag</Button> */}
    </Grid >
}
